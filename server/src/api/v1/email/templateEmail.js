import { formatCapitalize } from "../../utils/formatData.js";

const emailVerifyNewRegister = (username, emailEncoded, token) => {
  let verifyBtn = `
    <a href="${process.env.REACT_CLIENT_URI}/auth/verify-email/${emailEncoded}/${token}" 
        style="display: block; width: 250px; height: 50px; font-size: 16px;
        background-color: #00a86b; color: #fff; font-weight: 500;
        text-align: center; margin: 10px 0; line-height: 50px;
        text-decoration: none; border-radius: 10px;"
    >
        Verify Email
    </a>
    `;

  let message = `
    <h1 style="text-align: center; color: #00a86b">
      <b> VERIFY EMAIL REGISTRATION </b>
    </h1>
    Hi ${formatCapitalize(username)},
    <p> Welcome to our family. Please click the button below to verify your 
        email address. This email will expired in 1 hour.
    </p>
    <div style="text-align: center;">
        ${verifyBtn}
    </div>
    <div> Thank you for using our service! </div>
    <br> Best regards,</br>
    <br> The Atlana shop team </br>
    `;
  return message;
};

export { emailVerifyNewRegister };
