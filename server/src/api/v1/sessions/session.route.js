import express from "express";
import sessionController from "./session.controller.js";
import payloadValidator from "./session.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/refresh-token",
  authMiddleware.verifyRefreshToken,
  sessionController.handleRefreshTokenReq
);

router.post(
  "/:id",
  authMiddleware.verifyAccessToken,
  sessionController.handleSignOutReq
);

router.post(
  "/",
  payloadValidator.validateLoginPayload,
  sessionController.handleSignInReq
);

export default router;
