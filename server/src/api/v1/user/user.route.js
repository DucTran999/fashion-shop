import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "./user.controller.js";
import userPayloadMiddleware from "./user.validation.js";

const router = express.Router();

router.post("/verify-email", userController.sendNewVerifyEmailReq);

router.post(
  "/",
  userPayloadMiddleware.validateSignUpPayload,
  userController.signUpReq
);

router.patch(
  "/:id/info",
  userPayloadMiddleware.validateUpdatePayload,
  authMiddleware.verifyAccessToken,
  userController.updateUserInfoReq
);

router.patch(
  "/:id/password",
  userPayloadMiddleware.validateChangePasswordPayload,
  authMiddleware.verifyAccessToken,
  userController.changeUserPasswordReq
);

router.get(
  "/verify-email/:cipher/:token",
  userController.verifyEmailRegistrationReq
);

router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  userController.getUserInfoReq
);

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  userController.getAllUsersReq
);

export default router;
