import express from "express";
import variantController from "./variant.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  variantController.getAll
);

router.post(
  "/",
  authMiddleware.verifyAdminAccessToken,
  variantController.addOne
);

// TODO: not finish
router.patch("/:id", variantController.changeInfo);

export default router;
