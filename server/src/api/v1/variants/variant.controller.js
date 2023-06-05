import createHttpError from "http-errors";
import variantModel from "./variant.model.js";

class VariantController {
  getAll = async (req, res, next) => {
    try {
      const variants = await variantModel.findAll();

      res.status(200).json({
        status: "success",
        message: null,
        elements: variants,
      });
    } catch (error) {
      next(error);
    }
  };

  addOne = async (req, res, next) => {
    try {
      // Reject when existed
      const isExisted = await variantModel.findBySku(req.body);
      if (isExisted) {
        throw new createHttpError.Conflict("Variant existed!");
      }

      // save to DB
      await variantModel.save(req.body);

      res.status(200).json({
        status: "success",
        message: `The ${req.body.sku} variant added!`,
      });
    } catch (error) {
      next(error);
    }
  };

  changeInfo = async (req, res, next) => {
    try {
      await variantModel.updateVariant(req.body);

      res.status(200).json({
        status: "success",
        message: `Variant updated!`,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new VariantController();
