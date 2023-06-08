import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import userController from "./user.controller.js";
import userPayloadMiddleware from "./user.validation.js";

const router = express.Router();

router.get(
  "/refresh-token",
  authMiddleware.verifyRefreshToken,
  userController.requestRefreshToken
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

router.get(
  "/get-users",
  authMiddleware.verifyAdminAccessToken,
  userController.requestGetUserList
);

router.post(
  "/sign-in",
  userPayloadMiddleware.validateLoginPayload,
  userController.requestSignIn
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
