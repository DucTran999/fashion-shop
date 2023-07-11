import createHttpError from "http-errors";
import productService from "./product.service.js";
import productModel from "./product.model.js";
import cacheMiddleware from "../middleware/cache.middleware.js";

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

  getOneById = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      const product = await productModel.findOneById(payload.id);

      // Cached in 5 mins
      await cacheMiddleware.cacheResponse(req, product, 60 * 5);

      res
        .status(200)
        .json({ status: "success", message: null, elements: product });
    } catch (error) {
      next(error);
    }
  };

  getAllWithBriefVariant = async (payload, req, res, next) => {
    try {
      // Pass the error to error handler middleware
      if (payload instanceof Error) throw payload;

      let totalPage, products;
      const { category, page } = payload;

      if (category === "all-products") {
        [totalPage, products] = await productService.findAllProducts(page);
      } else {
        [totalPage, products] = await productService.findAllByCategory(
          category,
          page
        );
      }

      const response = {
        status: "success",
        message: null,
        pages: { total_page: totalPage, current_page: +page },
        elements: products,
      };

      // Caching response
      if (products.length > 0) {
        await cacheMiddleware.cacheResponse(req, response, 3600 * 2);
      }

      res.status(200).json(response);
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
      console.log("3");
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
