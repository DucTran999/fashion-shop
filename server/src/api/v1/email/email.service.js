import createHttpError from "http-errors";

import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { emitUserVerifySuccess } from "../helpers/helper.socket.js";

import userRepository from "../user/user.repository.js";
import sessionModel from "../session/session.model.js";
import emailTokenManager from "./emailTokenManager.js";
import emailSender from "./emailSender.js";

const sendEmailRegistration = async (cusEmail, name) => {
  // Check tempUser exist when verifying
  const tempUser = await userRepository.findOneByEmailInRedis(cusEmail);
  if (!tempUser) {
    await emailTokenManager.deleteToken(cusEmail, EMAIL_TYPE.verifyNewRegister);

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
    await emailTokenManager.deleteToken(cusEmail, EMAIL_TYPE.verifyNewRegister);
    await userRepository.resetUserTempExpireTime(cusEmail);

    // send new email verify
    emailSender.sendEmail(EMAIL_TYPE.verifyNewRegister, cusEmail, name);
  }
};

const sendEmailUnlockAccount = async (cusEmail, name) => {
  const isBlocked = await sessionModel.getCurrentAttempt(cusEmail);
  if (!isBlocked) throw createHttpError.NotFound("Account is not blocked");

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
  await emailTokenManager.deleteToken(cusEmail, EMAIL_TYPE.verifyUnlockLogin);
  await emailSender.sendEmail(EMAIL_TYPE.verifyUnlockLogin, cusEmail, name);
};

const resendEmailStrategies = {
  [EMAIL_TYPE.verifyNewRegister]: sendEmailRegistration,
  [EMAIL_TYPE.verifyUnlockLogin]: sendEmailUnlockAccount,
};

const verifyEmailRegistration = async (email, token) => {
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

  await userRepository.save(JSON.parse(tempUser));
  await emailTokenManager.deleteToken(email, EMAIL_TYPE.verifyNewRegister);
  await emitUserVerifySuccess(email);
};

const verifyEmailUnlockAccount = async (email, token) => {
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
  await emailTokenManager.deleteToken(email, EMAIL_TYPE.verifyUnlockLogin);
  await sessionModel.deleteAttemptRecord(email);
};

const verifyEmailStrategies = {
  [EMAIL_TYPE.verifyNewRegister]: verifyEmailRegistration,
  [EMAIL_TYPE.verifyUnlockLogin]: verifyEmailUnlockAccount,
};

/**
 * Processing send email.
 * @param {{email: string, cusName: string, service: string }} info - Basic information used for creating email
 */
const sendMailHandler = async (info) => {
  const { email, name, service } = info;

  return await resendEmailStrategies[service](email, name);
};

/**
 * Processing verify email.
 * @param {{email: string, service: string, token: string }} credentials - Credentials for authenticate
 */
const verifyEmailHandler = async (credentials) => {
  const { email, service, token } = credentials;

  return await verifyEmailStrategies[service](email, token);
};

export default {
  sendMailHandler: sendMailHandler,
  verifyEmailHandler: verifyEmailHandler,
};
