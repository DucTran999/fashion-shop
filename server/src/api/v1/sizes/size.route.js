import express from "express";
import sizeController from "./size.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware.verifyAdminAccessToken, sizeController.getAll);

router.post("/", authMiddleware.verifyAdminAccessToken, sizeController.addOne);

router.patch(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  sizeController.updateValue
);

export default router;
