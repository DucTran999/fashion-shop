import express from "express";
import notificationController from "./notification.controller.js";
import authenticationMiddleware from "../middleware/auth.middleware.js";
import validatePayloadMiddleware from "./notification.validation.js";

const router = express.Router();

router.get(
  "/:user_id",
  authenticationMiddleware.verifyAccessToken,
  notificationController.getUserNotificationsReq
);

router.patch(
  "/:user_id",
  validatePayloadMiddleware.updateNotificationPayloadValidator,
  authenticationMiddleware.verifyAccessToken,
  notificationController.changeNotificationMarkReq
);

router.delete(
  "/:user_id/:notification_id",
  validatePayloadMiddleware.deleteNotificationPayloadValidator,
  authenticationMiddleware.verifyAccessToken,
  notificationController.deleteNotificationReq
);

export default router;
