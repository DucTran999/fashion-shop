import { EMAIL_TYPE } from "../../utils/constVariable.js";
import emailService from "./email.service.js";

class EmailController {
  sendNewVerifyEmailReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const { email, name, service } = payload;

      if (service === EMAIL_TYPE.verifyNewRegister) {
        await emailService.sendEmailRegistration(email, name);
      } else if (service === EMAIL_TYPE.verifyUnlockLogin) {
        await emailService.sendEmailUnlockAccount(email, name);
      }

      res.status(201).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  verifyEmailReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const { email, service, token } = payload;

      if (service === EMAIL_TYPE.verifyNewRegister) {
        await emailService.verifyEmailRegistration(email, token);
      } else if (service === EMAIL_TYPE.verifyUnlockLogin) {
        await emailService.verifyEmailUnlockAccount(email, token);
      }

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };
}

export default new EmailController();
