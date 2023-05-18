import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (passwordPlainText) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  return bcrypt.hashSync(passwordPlainText, salt);
};

export const isPasswordMatch = async (userGiven, DatabaseGiven) => {
  return await bcrypt.compare(userGiven, DatabaseGiven);
};
