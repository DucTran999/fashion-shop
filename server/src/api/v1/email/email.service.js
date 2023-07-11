import createHttpError from "http-errors";

import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { emitUserVerifySuccess } from "../helpers/helper.socket.js";

import userRepository from "../user/user.repository.js";
import sessionModel from "../session/session.model.js";
import emailTokenManager from "./emailTokenManager.js";
import emailSender from "./emailSender.js";

class EmailService {
  sendEmailRegistration = async (cusEmail, name) => {
    // Check tempUser exist when verifying
    const tempUser = await userRepository.findOneByEmailInRedis(cusEmail);
    if (!tempUser) {
      await emailTokenManager.deleteToken(
        cusEmail,
        EMAIL_TYPE.verifyNewRegister
      );

      throw createHttpError.NotFound(
        `User no longer available! Please register again.`
      );
    }

    const tokenLifeTime = await emailTokenManager.getTokenTTL(
      cusEmail,
      EMAIL_TYPE.verifyNewRegister
    );

    // Prevent to send email contiguous (Time to wait: 5 mins)
    if (tokenLifeTime < 3600 - 60 * 5) {
      // Delete current token and reset account expire time
      emailTokenManager.deleteToken(cusEmail, EMAIL_TYPE.verifyNewRegister);
      userRepository.resetUserTempExpireTime(cusEmail);

      // send new email verify
      emailSender.sendEmail(EMAIL_TYPE.verifyNewRegister, cusEmail, name);
    }
  };

  sendEmailUnlockAccount = async (cusEmail, name) => {
    const isBlocked = await sessionModel.getCurrentAttempt(cusEmail);
    if (!isBlocked) {
      throw createHttpError.NotFound("Account is not blocked");
    }

    // Check user is already in system
    const userInSystem = await userRepository.findOneByEmail(cusEmail);
    if (!userInSystem.length) return;

    // Prevent to send email contiguous (Time to wait: 2 mins)
    const tokenLifeTime = await emailTokenManager.getTokenTTL(
      cusEmail,
      EMAIL_TYPE.verifyNewRegister
    );
    if (tokenLifeTime > 5 * 60 - 120) return;

    // Delete old token and send new email verify with new token
    emailTokenManager.deleteToken(cusEmail, EMAIL_TYPE.verifyUnlockLogin);
    emailSender.sendEmail(EMAIL_TYPE.verifyUnlockLogin, cusEmail, name);
  };

  verifyEmailRegistration = async (email, token) => {
    // Check token is not expired
    const tokenInRedis = await emailTokenManager.getToken(
      email,
      EMAIL_TYPE.verifyNewRegister
    );
    if (token !== tokenInRedis) {
      throw createHttpError.NotAcceptable(
        "Verification link expired! Please request a new verification link!"
      );
    }

    // Check tempUser exist when verifying
    const tempUser = await userRepository.findOneByEmailInRedis(email);
    if (!tempUser) {
      await emailTokenManager.deleteToken(email, EMAIL_TYPE.verifyNewRegister);

      throw createHttpError.NotFound(
        `User no longer available! Please register again.`
      );
    }

    userRepository.save(JSON.parse(tempUser));
    emailTokenManager.deleteToken(email, EMAIL_TYPE.verifyNewRegister);
    emitUserVerifySuccess(email);
  };

  verifyEmailUnlockAccount = async (email, token) => {
    // Check token is not expired
    const tokenInRedis = await emailTokenManager.getToken(
      email,
      EMAIL_TYPE.verifyUnlockLogin
    );
    if (token !== tokenInRedis) {
      throw createHttpError.NotAcceptable(
        "Verification link expired! Please request a new verification link!"
      );
    }

    // Remove token and attempt record
    emailTokenManager.deleteToken(email, EMAIL_TYPE.verifyUnlockLogin);
    sessionModel.deleteAttemptRecord(email);
  };
}

export default new EmailService();
