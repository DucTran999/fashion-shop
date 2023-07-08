import CryptoJS from "crypto-js";

const encryptAES = (plaintext) => {
  const cipher = CryptoJS.AES.encrypt(
    plaintext,
    process.env.AES_KEY
  ).toString();

  return cipher;
};

const decryptAES = (cipher) => {
  const plaintext = CryptoJS.AES.decrypt(cipher, process.env.AES_KEY).toString(
    CryptoJS.enc.Utf8
  );

  return plaintext;
};

export { encryptAES, decryptAES };
