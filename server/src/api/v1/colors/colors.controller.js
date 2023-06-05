import createHttpError from "http-errors";
import colorModel from "./colors.model.js";

class ColorController {
  getAll = async (req, res, next) => {
    try {
      const colors = await colorModel.findAll();

      res
        .status(200)
        .json({ status: "success", message: null, elements: colors });
    } catch (err) {
      next(err);
    }
  };

  getOneById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const color = await colorModel.findOneById(id);
      if (!color) {
        throw createHttpError("Color Not found!");
      }

      res
        .status(200)
        .json({ status: "success", message: null, elements: color });
    } catch (err) {
      next(err);
    }
  };

  addOne = async (req, res, next) => {
    try {
      // check color is exited
      const { color_value } = req.body;
      const isExisted = await colorModel.findByValue(color_value);

      // Abort if existed
      if (isExisted) {
        throw new createHttpError.Conflict("Color Already existed");
      }

      // save to DB
      await colorModel.save(color_value);
      res.status(200).json({ status: "success", message: "New Color Added" });
    } catch (err) {
      next(err);
    }
  };

  updateValue = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { color_value } = req.body;
      const isExisted = await colorModel.findByValue(color_value);

      if (isExisted) {
        throw createHttpError.Conflict("Color existed");
      }

      await colorModel.updateColor(id, color_value);
      res
        .status(200)
        .json({ status: "success", message: "Update Color Successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default new ColorController();
