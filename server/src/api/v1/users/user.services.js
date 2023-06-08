import createHttpError from "http-errors";
import User from "./user.model.js";

import userRepository from "./user.repository.js";
import jwtHelper from "../helpers/helper.jwt.js";
import { encryptUserPayload, decrypt } from "../../utils/normalizeData.js";
import { hashPassword, isPasswordMatch } from "../../utils/passwordHandler.js";

class UserService {
  authentication = async (signInInfo) => {
    let { email, password } = signInInfo;
    // Normalize
    email = email.toLowerCase().trim();
    password = password.trim();

    // Check email is exist or not
    const isEmailExisted = await userRepository.isExistEmail(email);
    if (!isEmailExisted) {
      throw new createHttpError.Unauthorized();
    }

    const [user] = await userRepository.findUserByEmail(email);
    if (user.is_disabled) {
      throw new createHttpError.Forbidden("Account banned!");
    }

    // Verify password
    const isMatch = await isPasswordMatch(password, user.password);
    if (!isMatch) {
      throw new createHttpError.Unauthorized();
    }

    // Generate token
    const accessToken = await jwtHelper.signAccessToken(user);
    const refreshToken = await jwtHelper.signRefreshToken(user);

    return [accessToken, refreshToken];
  };

  refreshToken = async (userInfo) => {
    // Sign new token pairs.
    const accessToken = await jwtHelper.signAccessToken(userInfo);
    const refreshToken = await jwtHelper.signRefreshToken(userInfo);

    return [accessToken, refreshToken];
  };

  removeRefreshToken = async (key) => {
    try {
      await jwtHelper.removeRefreshTokenOnRedis(key);
    } catch (err) {
      throw createHttpError.InternalServerError();
    }
  };

  getAllUsers = async () => {
    return await userRepository.selectAll();
  };

  findUserById = async (userId) => {
    let user = await userRepository.findOneById(userId);

    if (user) {
      return encryptUserPayload(user);
    }
    return user;
  };

  updateUser = async (user_id, payload) => {
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

  updateNewPassword = async (userId, payload) => {
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

  addNewUser = async (userInfo) => {
    let { first_name, last_name, email, password } = userInfo;

    // Check email is exist or not
    const isEmailExisted = await userRepository.isExistEmail(
      email.toLowerCase().trim()
    );

    if (isEmailExisted) {
      throw new createHttpError.Conflict("Email already registered!");
    }
    // hashing password before save to DB
    const hash = await hashPassword(password);
    const user = new User(first_name, last_name, email, hash);

    // write to DB
    await userRepository.save(user);
  };
}

export default new UserService();
