import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

import transporter from "../helpers/init.smtp.js";

import { encryptAES } from "../../utils/crypto.js";
import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { formatHyphenToLowerCaseNoSpace } from "../../utils/formatData.js";

import emailTemplate from "./templateEmail.js";
import emailTokenManager from "./emailTokenManager.js";

dotenv.config();

const adminMail = process.env.ADMIN_EMAIL;
const unlockMail = EMAIL_TYPE.verifyUnlockLogin;
const registrationMail = EMAIL_TYPE.verifyNewRegister;

/**
 * Create verify email for verifying account just registered.
 * @param {string} customerEmail - The customer email
 * @param {string} customerName  - The customer name
 */
const newRegistrationMail = async (customerEmail, customerName) => {
  const token = formatHyphenToLowerCaseNoSpace(uuidv4());
  const credentials = { email: customerEmail, service: registrationMail };

  const cipher = encodeURIComponent(encryptAES(JSON.stringify(credentials)));

  const mailContent = {
    from: adminMail,
    to: customerEmail,
    subject: "Verify email for new registration!",
    html: emailTemplate.emailNewRegistration(customerName, cipher, token),
  };

  await emailTokenManager.saveToken(
    customerEmail,
    token,
    registrationMail,
    3600
  );

  return mailContent;
};

/**
 * Create verify email for unlock account
 * @param {string} customerEmail - The customer email
 * @param {string} customerName  - The customer name
 */
const unlockAccountMail = async (customerEmail, customerName) => {
  const token = formatHyphenToLowerCaseNoSpace(uuidv4());
  const credentials = { email: customerEmail, service: unlockMail };

  const cipher = encodeURIComponent(encryptAES(JSON.stringify(credentials)));

  const mailContent = {
    from: adminMail,
    to: customerEmail,
    subject: "Confirm email to unlock account!",
    html: emailTemplate.emailUnlockAccount(customerName, cipher, token),
  };

  await emailTokenManager.saveToken(customerEmail, token, unlockMail, 60 * 5);

  return mailContent;
};

/**
 * The map to find suitable strategy for creating email
 */
const createEmailStrategies = {
  [unlockMail]: unlockAccountMail,
  [registrationMail]: newRegistrationMail,
};

/**
 * Create and send emails on demand
 * @param {string} type - The email type
 * @param {string} customerEmail - The customer email
 * @param {string} customerName - The customer name
 */
const sendEmail = async (type, customerEmail, customerName) => {
  try {
    let mail = await createEmailStrategies[type](customerEmail, customerName);

    const info = await transporter.sendMail(mail);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
};

export default { sendEmail: sendEmail };
