import emailBuilder from "./emailBuilder.js";

import * as dotenv from "dotenv";
dotenv.config();

const clientUrl = process.env.REACT_CLIENT_URI;
const baseEndpoint = `${clientUrl}/auth/verify-email`;

/**
 * The template email for verifying new registration
 * @param {string} username - Receiver name
 * @param {{service: string, email: string}} credentials - Auth info encrypted
 * @param {string} token - email token
 * @returns {string} email completed
 */
const emailNewRegistration = (username, credentials, token) => {
  const title = "verify email registration";
  const content = ` 
    Welcome to our family. Please click the button below to verify your email 
    address. This email will expired in 1 hour.`;
  const btnTitle = "Verify Email";
  const endpoint = `${baseEndpoint}/${credentials}/${token}`;

  return emailBuilder.getVerifyEmail(
    title,
    username,
    content,
    endpoint,
    btnTitle
  );
};

/**
 * The template email for verifying to unlock account
 * @param {string} username - Receiver name
 * @param {{service: string, email: string}} credentials - Auth info encrypted
 * @param {string} token - email token
 * @returns {string} email completed
 */
const emailUnlockAccount = (username, credentials, token) => {
  const emailTitle = "verify email to unlock account";
  const content = ` 
    Someone is trying to access your account. We temporarily locked your account
    in 5 minutes. If it's you, please click the button below we will unlock your
    account immediately.`;
  const btnTitle = "Yes, I do that";
  const endpoint = `${baseEndpoint}/${credentials}/${token}`;

  const email = emailBuilder.getVerifyEmail(
    emailTitle,
    username,
    content,
    endpoint,
    btnTitle
  );

  return email;
};

export default {
  emailUnlockAccount: emailUnlockAccount,
  emailNewRegistration: emailNewRegistration,
};
