import express from "express";
import ordersController from "./orders.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import payloadMiddleware from "./orders.validation.js";

const router = express.Router();

router.post(
  "/",
  payloadMiddleware.validatePlaceOrderPayload,
  authMiddleware.verifyAccessToken,
  ordersController.placeNewOrder
);

// User send req for canceling an order. Need admin confirm to be cancelled.
router.delete(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.cancelOrder
);

router.get(
  "/:id",
  authMiddleware.verifyAccessToken,
  ordersController.getUserOrderWithState
);

router.get("/", ordersController.getAll);

export default router;
