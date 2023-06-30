import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import categoryController from "./category.controller.js";
import checkPayload from "./category.validation.js";

const router = express.Router();

router.get("/:id/products", categoryController.getAllProductInCategory);

router.get(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  categoryController.getCategoryByIdReq
);

router.patch(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  categoryController.updateCategoryReq
);

router.post(
  "/",
  checkPayload.validateAddCategoryPayload,
  authMiddleware.verifyAdminAccessToken,
  categoryController.addNewCategoryReq
);

router.patch(
  "/:id/recovery",
  authMiddleware.verifyAdminAccessToken,
  categoryController.recoveryCategoryReq
);

router.delete(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  categoryController.removeCategoryReq
);

router.get("/", categoryController.getAllCategoriesReq);

export default router;
