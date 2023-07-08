import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

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

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(">>> SMTP ::: Ready");
  }
});

export default transporter;
