import sizeModel from "./size.model.js";
import createHttpError from "http-errors";

class SizeController {
  getAll = async (req, res, next) => {
    try {
      const sizes = await sizeModel.findAll();

      res
        .status(200)
        .json({ status: "success", message: null, elements: sizes });
    } catch (err) {
      next(err);
    }
  };

  addOne = async (req, res, next) => {
    try {
      const { size_value } = req.body;
      const isExisted = await sizeModel.findByValue(size_value);
      if (isExisted) {
        throw new createHttpError.Conflict("Size Already existed");
      }

      await sizeModel.save(size_value);
      res.status(200).json({ status: "success", message: "New Sizes Added" });
    } catch (err) {
      next(err);
    }
  };

  updateValue = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { size_value } = req.body;

      const isExisted = await sizeModel.findByValue(size_value);
      if (isExisted) {
        throw createHttpError.Conflict("Size existed");
      }

      await sizeModel.updateSize(id, size_value);
      res
        .status(200)
        .json({ status: "success", message: "Update Size Successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default new SizeController();
