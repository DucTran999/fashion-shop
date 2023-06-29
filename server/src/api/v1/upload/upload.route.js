import express from "express";
import uploadsController from "./upload.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/product-img",
  authMiddleware.verifyAdminAccessToken,
  uploadsController.uploadProductImageReq
);

router.post(
  "/product-gallery",
  authMiddleware.verifyAdminAccessToken,
  uploadsController.uploadProductGalleryReq
);

export default router;
