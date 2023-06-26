import createHttpError from "http-errors";
import productService from "./product.service.js";
import productModel from "./product.model.js";

class ProductController {
  getAll = async (req, res, next) => {
    try {
      const products = await productModel.findAll();

      res
        .status(200)
        .json({ status: "success", message: null, elements: products });
    } catch (error) {
      next(error);
    }
  };

  getOneById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productModel.findOneById(id);

      res
        .status(200)
        .json({ status: "success", message: null, elements: product });
    } catch (error) {
      next(error);
    }
  };

  getAllWithBriefVariant = async (req, res, next) => {
    try {
      const { category, page } = req.query;

      let totalPage, products;
      if (category === "all-products") {
        [totalPage, products] = await productService.findAllProducts(page);
      } else {
        [totalPage, products] = await productService.findAllByCategory(
          category,
          page
        );
      }

      res.status(200).json({
        status: "success",
        message: null,
        pages: {
          total_page: totalPage,
          current_page: +page,
        },
        elements: products,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllWithFilter = async (req, res, next) => {
    try {
      const { type, category, limit } = req.query;

      const products = await productService.findAllByFilter(
        type,
        category,
        limit
      );

      res.status(200).json({
        status: "success",
        message: null,
        elements: products,
      });
    } catch (err) {
      next(err);
    }
  };

  addOne = async (req, res, next) => {
    try {
      // Check product existed
      const isExisted = await productModel.findByName(req.body);
      if (isExisted) {
        throw new createHttpError.Conflict("Product is existed!");
      }

      // Save to DB
      await productModel.save(req.body);

      res
        .status(200)
        .json({ status: "success", message: "New Product Added!" });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
