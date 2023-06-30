import categoryModel from "./category.model.js";
import createHttpError from "http-errors";

class CategoryController {
  getAllCategoriesReq = async (_req, res, next) => {
    try {
      const categories = await categoryModel.findAll();

      res.status(200).json({
        status: "success",
        message: null,
        elements: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProductInCategory = async (req, res, next) => {
    try {
      const products = await categoryModel.finAllProductByCategoryId(
        req.params.id
      );

      res
        .status(200)
        .json({ status: "success", message: null, elements: products });
    } catch (error) {
      next(error);
    }
  };

  getCategoryByIdReq = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findOneById(id);

      res.status(200).json({
        status: "success",
        message: null,
        elements: category,
      });
    } catch (error) {
      next(error);
    }
  };

  addNewCategoryReq = async (req, res, next) => {
    try {
      // Abort when category already existed
      const isExisted = await categoryModel.findByName(req.body.category_name);
      if (isExisted) {
        throw new createHttpError.Conflict("Already existed!");
      }

      await categoryModel.save(req.body);
      res.status(201).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  updateCategoryReq = async (req, res, next) => {
    try {
      await categoryModel.updateData(req.params.id, req.body.category_name);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  recoveryCategoryReq = async (req, res, next) => {
    try {
      await categoryModel.setVisible(req.params.id);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  removeCategoryReq = async (req, res, next) => {
    try {
      await categoryModel.delete(req.params.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}

export default new CategoryController();
