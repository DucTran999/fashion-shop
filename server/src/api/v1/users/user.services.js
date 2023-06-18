import createHttpError from "http-errors";
import userRepository from "./user.repository.js";
import { encryptUserPayload, decrypt } from "../../utils/normalizeData.js";
import { hashPassword, isPasswordMatch } from "../../utils/passwordHandler.js";

class UserService {
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

  createUser = async (userInfo) => {
    const { email, password } = userInfo;

    // Check email is exist or not
    const userInDB = await userRepository.findOneByEmail(email);
    if (userInDB.length) {
      throw new createHttpError.Conflict("Email already registered!");
    }

    // hashing password before save to DB
    const hash = await hashPassword(password);
    const user = { ...userInfo, password: hash };

    // write to DB
    await userRepository.save(user);
  };
}

export default new UserService();
