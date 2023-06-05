import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import categoryController from "./category.controller.js";
import checkPayload from "./category.validation.js";

const router = express.Router();

// find all categories
router.get("/", categoryController.getAll);

// find all product in specific category
router.get("/:id/products", categoryController.getAllProductInCategory);

// find category by id
router.get(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  categoryController.getOneById
);

// update category information
router.patch(
  "/:id",
  authMiddleware.verifyAdminAccessToken,
  categoryController.changeInfo
);

// Add new category
router.post(
  "/",
  checkPayload.validateAddCategoryPayload,
  authMiddleware.verifyAdminAccessToken,
  categoryController.addOne
);

// Recovery category
router.patch(
  "/:id/recovery",
  authMiddleware.verifyAdminAccessToken,
  categoryController.recovery
);

router.delete(
  "/:id",
  // authMiddleware.verifyAdminAccessToken,
  categoryController.remove
);

export default router;
