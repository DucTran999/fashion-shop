import emailService from "./email.service.js";
import ipMonitor from "../helpers/helper.ipMonitor.js";

class EmailController {
  sendNewVerifyEmailReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      await emailService.sendMailHandler(payload);

      await ipMonitor.trackingReqPerMinutes(req);
      res.status(201).json({ status: "success", message: null });
    } catch (error) {
      await ipMonitor.trackingReqPerMinutes(req);
      next(error);
    }
  };

  verifyEmailReq = async (payload, req, res, next) => {
    try {
      // Pass error to error handler middleware
      if (payload instanceof Error) throw payload;

      await emailService.verifyEmailHandler(payload);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };
}

export default new EmailController();
