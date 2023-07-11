import express from "express";

import sessionController from "./session.controller.js";
import payloadValidator from "./session.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";
import rateLimitMiddleware from "../middleware/rateLimit.middleware.js";

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
  rateLimitMiddleware.rateLimit(5, 120),
  payloadValidator.validateLoginPayload,
  sessionController.handleSignInReq
);

export default router;
