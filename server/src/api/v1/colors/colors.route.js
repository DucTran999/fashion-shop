import express from "express";
import colorsController from "./colors.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware.verifyAdminAccessToken, colorsController.getAll);

router.get(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  colorsController.getOneById
);

router.post(
  "/",
  authMiddleware.verifyAdminAccessToken,
  colorsController.addOne
);

router.patch(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  colorsController.updateValue
);

export default router;
