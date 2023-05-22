import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "./user.controller.js";
import userPayloadMiddleware from "./user.validation.js";

const router = express.Router();

router.get(
  "/get-users",
  authMiddleware.verifyAdminAccessToken,
  userController.requestGetUserList
);

router.get(
  "/sign-out",
  authMiddleware.verifyRefreshToken,
  userController.requestSignOut
);

router.post(
  "/sign-up",
  userPayloadMiddleware.validateSignUpPayload,
  userController.requestSignUp
);

router.post(
  "/sign-in",
  userPayloadMiddleware.validateLoginPayload,
  userController.requestSignIn
);

router.get(
  "/refresh-token",
  authMiddleware.verifyRefreshToken,
  userController.requestRefreshToken
);

export default router;
