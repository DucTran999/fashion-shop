import createHttpError from "http-errors";
import userRepository from "../user/user.repository.js";
import jwtHelper from "../helpers/helper.jwt.js";
import { isPasswordMatch } from "../../utils/passwordHandler.js";
import userServices from "../user/user.services.js";
import sessionModel from "./session.model.js";

class SessionService {
  authenticate = async (payload) => {
    const { email, password } = payload;

    // check login failed attempt
    const attempt = await sessionModel.getCurrentAttempt(email);
    if (+attempt > 2) {
      await userServices.sendVerifyEmailUnlockAccount(email);
      throw createHttpError.Locked();
    }

    // Check account is verified
    const isAccountVerified = await userRepository.findOneByEmailInRedis(email);
    if (isAccountVerified) throw createHttpError.Forbidden();

    // Check email existence
    const userInDB = await userRepository.findOneByEmail(email);
    if (!userInDB.length) throw createHttpError.Unauthorized();

    // Check account active
    const user = userInDB[0];
    if (user.is_disabled) throw createHttpError.Forbidden("Account banned!");

    // Verify password
    const isMatch = await isPasswordMatch(password, user.password);
    if (!isMatch) throw createHttpError.Unauthorized();

    // Generate token
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
