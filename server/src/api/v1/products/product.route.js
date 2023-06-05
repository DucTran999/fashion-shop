import express from "express";
import productController from "./product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/brief-variants", productController.getAllWithBriefVariant);

router.get("/filter", productController.getAllWithFilter);

router.get("/:id", productController.getOneById);

router.post(
  "/",
  authMiddleware.verifyAdminAccessToken,
  productController.addOne
);

router.get("/", productController.getAll);

export default router;
