import express from "express";

import searchController from "./search.controller.js";
import rateLimitMiddleware from "../middleware/rateLimit.middleware.js";
import validatePayloadMiddleware from "./search.validation.js";

const router = express.Router();

router.get(
  "/",
  rateLimitMiddleware.rateLimit(10, 60),
  validatePayloadMiddleware.validateSearchTerm,
  searchController.searchProductReq
);

export default router;
