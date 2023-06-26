import express from "express";
import cartController from "./cart.controller.js";
import validateMiddleware from "./cart.validate.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.delete(
  "/one-product/:id",
  validateMiddleware.validateRemoveProductCartPayload,
  authMiddleware.verifyAccessToken,
  cartController.removeProductCart
);

router.patch(
  "/direct-qty/:id",
  validateMiddleware.validateAddProductToCartPayload,
  authMiddleware.verifyAccessToken,
  cartController.updateQtyFormCart
);

router.patch(
  "/:id",
  validateMiddleware.validateAddProductToCartPayload,
  authMiddleware.verifyAccessToken,
  cartController.updateCart
);

router.get(
  "/full-info/:id",
  authMiddleware.verifyAccessToken,
  cartController.getCart
);

export default router;
