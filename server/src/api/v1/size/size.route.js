import express from "express";
import sizeController from "./size.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  sizeController.updateSizeReq
);

router.get(
  "/",
  authMiddleware.verifyAdminAccessToken,
  sizeController.getAllSizesReq
);

router.post(
  "/",
  authMiddleware.verifyAdminAccessToken,
  sizeController.addNewSizeReq
);

export default router;
