import express from "express";

import productController from "./product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import cacheMiddleware from "../middleware/cache.middleware.js";
import validatePayloadMiddleware from "./products.validation.js";
import rateLimitMiddleware from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.get(
  "/brief-variants",
  rateLimitMiddleware.rateLimit(100, 60),
  validatePayloadMiddleware.validateGetProductsListPayload,
  cacheMiddleware.getResponseCached,
  productController.getAllWithBriefVariant
);

router.get("/filter", productController.getAllWithFilter);

router.get(
  "/:id",
  // rateLimitMiddleware.rateLimit(20, 60),
  validatePayloadMiddleware.validateGetProductPayload,
  cacheMiddleware.getResponseCached,
  productController.getOneById
);

router.post(
  "/",
  authMiddleware.verifyAdminAccessToken,
  productController.addOne
);

router.get("/", productController.getAll);

export default router;
