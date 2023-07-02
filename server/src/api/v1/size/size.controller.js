import sizeModel from "./size.model.js";
import createHttpError from "http-errors";

class SizeController {
  getAllSizesReq = async (req, res, next) => {
    try {
      const sizes = await sizeModel.findAll();

      res
        .status(200)
        .json({ status: "success", message: null, elements: sizes });
    } catch (err) {
      next(err);
    }
  };

  addNewSizeReq = async (req, res, next) => {
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

  updateSizeReq = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { size_value } = req.body;

      const isExisted = await sizeModel.findByValue(size_value);
      if (isExisted) {
        throw createHttpError.Conflict("Size existed");
      }

      await sizeModel.update(id, size_value);
      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };
}

export default new SizeController();
