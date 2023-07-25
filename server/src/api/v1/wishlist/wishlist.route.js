import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import rateLimitMiddleware from "../middleware/rateLimit.middleware.js";
import payloadMiddleware from "./wishlist.validation.js";
import wishlistController from "./wishlist.controller.js";

const router = express.Router();

router.post(
  "/:wishlist_id",
  rateLimitMiddleware.rateLimit(15, 60),
  payloadMiddleware.validateAddProductToWishlistPayload,
  authMiddleware.verifyAccessToken,
  wishlistController.addProductToWishlistReq
);

router.patch(
  "/:wishlist_id",
  rateLimitMiddleware.rateLimit(15, 60),
  payloadMiddleware.validateSyncWishlistPayload,
  authMiddleware.verifyAccessToken,
  wishlistController.syncWishlistReq
);

router.delete(
  "/:wishlist_id/:product_id",
  rateLimitMiddleware.rateLimit(15, 60),
  payloadMiddleware.validateDeleteProductWishlistPayload,
  authMiddleware.verifyAccessToken,
  wishlistController.deleteProductFromWishlistReq
);

router.get(
  "/:wishlist_id",
  rateLimitMiddleware.rateLimit(15, 60),
  payloadMiddleware.validateGetProductWishlistPayload,
  authMiddleware.verifyAccessToken,
  wishlistController.getWishlistReq
);

export default router;
