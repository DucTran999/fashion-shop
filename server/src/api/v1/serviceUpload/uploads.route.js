import express from "express";
import uploadsController from "./uploads.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/product-img",
  authMiddleware.verifyAdminAccessToken,
  uploadsController.saveAProductImage
);

router.post(
  "/product-gallery",
  authMiddleware.verifyAdminAccessToken,
  uploadsController.saveProductGallery
);

export default router;
