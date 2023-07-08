import createHttpError from "http-errors";
import userRepository from "./user.repository.js";

import emailSender from "../email/emailSender.js";
import emailTokenManager from "../email/emailTokenManager.js";

import { hashPassword, isPasswordMatch } from "../../utils/passwordHandler.js";
import { encryptUserPayload } from "../../utils/normalizeData.js";
import { EMAIL_TYPE } from "../../utils/constVariable.js";

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
      throw createHttpError.UnprocessableEntity("Account not verify");
    }

    // Hashing password before save to DB
    const hash = await hashPassword(password);
    const user = { ...userInfo, password: hash };

    // Write to Redis
    await userRepository.saveToRedis(user);

    // Send only first time user submit. Resend if client request.
    const isEmailSent = await emailTokenManager.getToken(
      email,
      EMAIL_TYPE.verifyNewRegister
    );

    if (!isEmailSent) {
      emailSender.sendEmail(EMAIL_TYPE.verifyNewRegister, email, first_name);
    }
  };
}

export default new UserService();
