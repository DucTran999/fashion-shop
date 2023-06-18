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
  "/info/:id",
  userPayloadMiddleware.validateUpdatePayload,
  authMiddleware.verifyAccessToken,
  userController.updateUserInfo
);

router.patch(
  "/password/:id",
  userPayloadMiddleware.validateChangePasswordPayload,
  authMiddleware.verifyAccessToken,
  userController.updateUserPassword
);

router.get(
  "/info/:id",
  authMiddleware.verifyAccessToken,
  userController.getUserInfo
);

export default router;
