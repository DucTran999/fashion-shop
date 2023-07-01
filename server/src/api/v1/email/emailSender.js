import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { EMAIL_TYPE } from "../../utils/constVariable.js";
import { emailVerifyNewRegister } from "./templateEmail.js";
import { encrypt } from "../../utils/normalizeData.js";
import { formatHyphenToLowerCaseNoSpace } from "../../utils/formatData.js";
import { v4 as uuidv4 } from "uuid";
import redisClient from "../helpers/init.redis.client.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_URL
      : "localhost",
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_MAIL_PASSWORD,
  },
});

const sendEmail = (type, customerEmail, customerName) => {
  let mailContent;
  const token = formatHyphenToLowerCaseNoSpace(uuidv4());

  if (type === EMAIL_TYPE.verifyNewRegister) {
    const emailEncoded = encodeURIComponent(encrypt(customerEmail));

    mailContent = {
      from: process.env.ADMIN_EMAIL,
      to: customerEmail,
      subject: "Verify email for new registration!",
      html: emailVerifyNewRegister(customerName, emailEncoded, token),
    };
    redisClient.set(`verification:${customerEmail}#${token}`, customerEmail, {
      EX: 3600,
      NX: true,
    });
  }

  transporter.sendMail(mailContent, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(">>> SMTP ::: Ready");
  }
});

export default { sendEmail };
