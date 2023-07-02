import createHttpError from "http-errors";
import { uploadSingleImg, uploadMultiImg } from "./upload.validate.js";

class UploadController {
  uploadProductImageReq = (req, res, next) => {
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

      res.status(201).json({ status: "success", message: null });
    });
  };

  uploadProductGalleryReq = (req, res, next) => {
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

      res.status(201).json({ status: "success", message: null });
    });
  };
}

export default new UploadController();
