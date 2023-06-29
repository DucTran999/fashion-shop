import express from "express";
import ordersController from "./order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import payloadMiddleware from "./order.validation.js";

const router = express.Router();
router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.getUserOrdersByStateReq
);

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  ordersController.getAllUserOrdersByStateReq
);

router.post(
  "/",
  payloadMiddleware.placeOrderPayloadValidator,
  authMiddleware.verifyAccessToken,
  ordersController.placeOrderReq
);

router.patch(
  "/:order_id",
  authMiddleware.verifyAdminAccessToken,
  ordersController.adminUpdateOrderStateReq
);

router.patch(
  "/:id/to-ship",
  authMiddleware.verifyAdminAccessToken,
  ordersController.confirmUserOrderReq
);

router.patch(
  "/:id/shipping-failed",
  authMiddleware.verifyAdminAccessToken,
  ordersController.cancelUserOrderShippingFailedReq
);

router.delete(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.cancelOrderPendingAdminApprovalReq
);

export default router;
