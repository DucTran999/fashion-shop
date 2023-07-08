import createHttpError from "http-errors";

import jwtHelper from "../helpers/helper.jwt.js";
import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { isPasswordMatch } from "../../utils/passwordHandler.js";

import userRepository from "../user/user.repository.js";
import sessionModel from "./session.model.js";
import emailService from "../email/email.service.js";
import emailTokenManager from "../email/emailTokenManager.js";

class SessionService {
  authenticate = async (payload) => {
    const { email, password } = payload;

    // Check account is verified
    const isAccountVerified = await userRepository.findOneByEmailInRedis(email);
    if (isAccountVerified) throw createHttpError.Forbidden();

    // Retrieve user in DB
    const userInDB = await userRepository.findOneByEmail(email);

    // check login failed attempt and send verify mail
    const attempt = await sessionModel.getCurrentAttempt(email);
    if (+attempt > 2) {
      const isEmailSent = await emailTokenManager.getToken(
        email,
        EMAIL_TYPE.verifyUnlockLogin
      );

      // If email exist and send unlock email only for first time.
      if (userInDB.length && !isEmailSent) {
        await emailService.sendEmailUnlockAccount(
          email,
          userInDB[0].first_name
        );
      }
      throw createHttpError.Locked();
    }

    // If email not exist
    if (!userInDB.length) throw createHttpError.Unauthorized();

    // Check account active
    const user = userInDB[0];
    if (user.is_disabled) throw createHttpError.Forbidden("Account banned!");

    // Verify password
    const isMatch = await isPasswordMatch(password, user.password);
    if (!isMatch) throw createHttpError.Unauthorized();

    // Generate pair of tokens and delete failed login attempts
    const accessToken = await jwtHelper.signAccessToken(user);
    const refreshToken = await jwtHelper.signRefreshToken(user);
    await sessionModel.deleteAttemptRecord(email);

    return [accessToken, refreshToken];
  };

  updateLoginAttempt = async (payload) => {
    const { email } = payload;
    let currentAttempt = await sessionModel.getCurrentAttempt(email);
    if (!currentAttempt) {
      await sessionModel.createNewAttemptRecord(email);
    } else {
      await sessionModel.increaseAttempt(email);
    }
  };

  removeRefreshToken = async (key) => {
    try {
      await jwtHelper.removeRefreshTokenOnRedis(key);
    } catch (err) {
      throw createHttpError.InternalServerError();
    }
  };

  refreshToken = async (userInfo) => {
    // Sign new token pairs.
    const accessToken = await jwtHelper.signAccessToken(userInfo);
    const refreshToken = await jwtHelper.signRefreshToken(userInfo);

    return [accessToken, refreshToken];
  };
}

export default new SessionService();
