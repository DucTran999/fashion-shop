import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "./user.controller.js";
import userPayloadMiddleware from "./user.validation.js";

const router = express.Router();

router.post(
  "/",
  userPayloadMiddleware.validateSignUpPayload,
  userController.handleSignUpReq
);

router.patch(
  "/:id/info",
  userPayloadMiddleware.validateUpdatePayload,
  authMiddleware.verifyAccessToken,
  userController.handleUpdateUserInfoReq
);

router.patch(
  "/:id/password",
  userPayloadMiddleware.validateChangePasswordPayload,
  authMiddleware.verifyAccessToken,
  userController.handleChangeUserPasswordReq
);

router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  userController.handleGetUserInfoReq
);

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  userController.handleGetUserListReq
);

export default router;
