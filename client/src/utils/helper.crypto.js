import CryptoJS from "crypto-js";
import { AES, mode } from "crypto-js";

export const encryptAES = (plain) => {
  const encryptedData = AES.encrypt(plain, process.env.REACT_APP_AES_KEY, {
    mode: mode.CBC,
  }).toString();

  return encryptedData;
};

export const decryptAES = (cipher) => {
  const decryptedData = AES.decrypt(cipher, process.env.REACT_APP_AES_KEY, {
    mode: mode.CBC,
  }).toString(CryptoJS.enc.Utf8);

  return decryptedData;
};
