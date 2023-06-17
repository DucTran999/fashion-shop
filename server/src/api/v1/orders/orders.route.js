import express from "express";
import ordersController from "./orders.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import payloadMiddleware from "./orders.validation.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  ordersController.getAllOrdersWithState
);

router.post(
  "/",
  payloadMiddleware.validatePlaceOrderPayload,
  authMiddleware.verifyAccessToken,
  ordersController.placeNewOrder
);

router.patch(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.adminUpdateOrderState
);

router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.getUserOrderWithState
);

// User send req for canceling an order. Need admin confirm to be cancelled.
router.delete(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.cancelOrder
);

router.patch(
  "/:id/to-ship",
  authMiddleware.verifyAdminAccessToken,
  ordersController.confirmOrder
);

router.patch(
  "/:id/shipping-failed",
  authMiddleware.verifyAdminAccessToken,
  ordersController.cancelOrderDeliveryFailed
);

export default router;
