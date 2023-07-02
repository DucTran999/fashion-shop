import createHttpError from "http-errors";
import userRepository from "./user.repository.js";
import emailSender from "../email/emailSender.js";
import { hashPassword, isPasswordMatch } from "../../utils/passwordHandler.js";
import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { encryptUserPayload, decrypt } from "../../utils/normalizeData.js";
import { emitUserVerifySuccess } from "../helpers/helper.socket.js";

class UserService {
  getAllUsers = async () => {
    return await userRepository.selectAll();
  };

  getUserInfoById = async (userId) => {
    let user = await userRepository.findOneById(userId);

    if (user) {
      return encryptUserPayload(user);
    }
    return user;
  };

  updateUserInfo = async (user_id, payload) => {
    const { first_name, last_name, address, phone, gender } = payload;
    await userRepository.updateOne(
      user_id,
      first_name.trim().toLowerCase(),
      last_name.trim().toLowerCase(),
      address.trim(),
      phone.trim(),
      gender.trim()
    );
  };

  updateUserPassword = async (userId, payload) => {
    // Verify old password
    const { old_password, new_password } = payload;
    const { password } = await userRepository.findUserPassword(userId);
    const isMatch = await isPasswordMatch(old_password, password);

    if (isMatch) {
      const newPassHash = await hashPassword(new_password);
      //Save to DB
      await userRepository.saveNewPassword(userId, newPassHash);
    } else {
      throw createHttpError.Unauthorized("Wrong password!");
    }
  };

  createTempUser = async (userInfo) => {
    const { first_name, email, password } = userInfo;

    // Check email is exist or not
    const userInDB = await userRepository.findOneByEmail(email);
    if (userInDB.length) {
      throw new createHttpError.Conflict("Email already registered!");
    }

    // Check user registered but not verify
    const userInRedis = await userRepository.findOneByEmailInRedis(email);
    if (userInRedis) {
      throw createHttpError.Conflict("Email already registered!");
    }

    // Hashing password before save to DB
    const hash = await hashPassword(password);
    const user = { ...userInfo, password: hash };

    // Write to Redis
    await userRepository.saveToRedis(user);

    // Send email for verify
    emailSender.sendEmail(EMAIL_TYPE.verifyNewRegister, email, first_name);
  };

  sendVerifyEmailRegistration = async (email, firstName) => {
    // Check tempUser exist when verifying
    const tempUser = await userRepository.findOneByEmailInRedis(email);
    if (!tempUser) {
      await userRepository.deleteVerifyEmailToken(email, "");

      throw createHttpError.NotFound(
        `User no longer available! Please register again.`
      );
    }

    // Delete current token and reset account expire time
    userRepository.deleteVerifyEmailToken(email, "");
    userRepository.resetUserTempExpireTime(email);

    // send new email verify
    emailSender.sendEmail(EMAIL_TYPE.verifyNewRegister, email, firstName);
  };

  verifyEmailRegistration = async (cipher, token) => {
    const email = decrypt(decodeURIComponent(cipher));
    const isTokenExpired = await userRepository.checkVerifyEmailTokenExist(
      email,
      token
    );

    // Check token expired
    if (!isTokenExpired)
      throw createHttpError.NotFound(
        `Verification link expired! Please request a new verification link!`
      );

    // Check tempUser exist when verifying
    const tempUser = await userRepository.findOneByEmailInRedis(email);
    if (!tempUser) {
      await userRepository.deleteVerifyEmailToken(email, token);

      throw createHttpError.NotFound(
        `User no longer available! Please register again.`
      );
    }

    // write to DB
    await userRepository.save(JSON.parse(tempUser));
    await userRepository.deleteVerifyEmailToken(email, token);

    await emitUserVerifySuccess(email);
  };
}

export default new UserService();
