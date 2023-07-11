import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

import transporter from "../helpers/init.smtp.js";

import { encryptAES } from "../../utils/crypto.js";
import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { formatHyphenToLowerCaseNoSpace } from "../../utils/formatData.js";

import emailTemplate from "./templateEmail.js";
import emailTokenManager from "./emailTokenManager.js";

dotenv.config();

const newRegistrationMail = async (customerEmail, customerName) => {
  const token = formatHyphenToLowerCaseNoSpace(uuidv4());
  const credentials = {
    email: customerEmail,
    service: EMAIL_TYPE.verifyNewRegister,
  };

  const cipher = encodeURIComponent(encryptAES(JSON.stringify(credentials)));

  const mailContent = {
    from: process.env.ADMIN_EMAIL,
    to: customerEmail,
    subject: "Verify email for new registration!",
    html: emailTemplate.emailNewRegistration(customerName, cipher, token),
  };

  await emailTokenManager.saveToken(
    customerEmail,
    token,
    EMAIL_TYPE.verifyNewRegister,
    3600
  );

  return mailContent;
};

const unlockAccountMail = async (customerEmail, customerName) => {
  const token = formatHyphenToLowerCaseNoSpace(uuidv4());
  const credentials = {
    email: customerEmail,
    service: EMAIL_TYPE.verifyUnlockLogin,
  };

  const cipher = encodeURIComponent(encryptAES(JSON.stringify(credentials)));

  const mailContent = {
    from: process.env.ADMIN_EMAIL,
    to: customerEmail,
    subject: "Confirm email to unlock account!",
    html: emailTemplate.emailUnlockAccount(customerName, cipher, token),
  };

  await emailTokenManager.saveToken(
    customerEmail,
    token,
    EMAIL_TYPE.verifyUnlockLogin,
    60 * 5
  );

  return mailContent;
};

const getMailStrategies = {
  [EMAIL_TYPE.verifyNewRegister]: newRegistrationMail,
  [EMAIL_TYPE.verifyUnlockLogin]: unlockAccountMail,
};

const sendEmail = async (type, customerEmail, customerName) => {
  try {
    let mailContent = await getMailStrategies[type](
      customerEmail,
      customerName
    );

    const info = await transporter.sendMail(mailContent);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
};

export default { sendEmail };
