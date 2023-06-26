import createHttpError from "http-errors";
import { uploadSingleImg, uploadMultiImg } from "./uploads.validate.js";

class UploadController {
  saveAProductImage = (req, res, next) => {
    // Handle upload
    uploadSingleImg(req, res, (err) => {
      // Request got an error when validation
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }

      // If request with empty file
      if (!req.file) {
        return next(createHttpError.BadRequest("File not found"));
      }

      res
        .status(200)
        .json({ status: "success", message: "images upload successfully!" });
    });
  };

  saveProductGallery = (req, res, next) => {
    // Handle upload
    uploadMultiImg(req, res, (err) => {
      // Request got an error when validation
      if (err) {
        console.log(JSON.stringify(err));
        return res.status(400).json({ status: "error", message: err.message });
      }

      // If request with empty file
      if (!req.files) {
        return next(createHttpError.BadRequest("File not found"));
      }

      res.status(200).json({
        status: "success",
        message: "images gallery upload successfully!",
      });
    });
  };
}

export default new UploadController();
