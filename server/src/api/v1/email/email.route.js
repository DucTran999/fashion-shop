import express from "express";
import emailController from "./email.controller.js";
import emailValidatePayloadMiddleware from "./email.validation.js";

const router = express.Router();

router.get(
  "/verify/:cipher/:token",
  emailValidatePayloadMiddleware.validateVerificationMailPayload,
  emailController.verifyEmailReq
);

router.post(
  "/resend",
  emailValidatePayloadMiddleware.validateResendMailPayload,
  emailController.sendNewVerifyEmailReq
);

export default router;
