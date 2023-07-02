import multer from "multer";
import { storageProduct } from "./upload.config.js";
const MINE_WHITELIST = ["image/png", "image/jpg", "image/webp", "image/jpeg"];

const uploadSingleImg = multer({
  storage: storageProduct,
  limits: {
    fieldNameSize: 50,
    fieldSize: 20000,
    fileSize: 50 * 2048 * 2048, // 200 KB for a 1365x2048 WEBP JPG PNG
  },
  fileFilter: (_req, file, callback) => {
    if (!MINE_WHITELIST.includes(file.mimetype)) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("proImage");

const uploadMultiImg = multer({
  storage: storageProduct,
  limits: {
    fieldNameSize: 50,
    fieldSize: 20000,
    fileSize: 5 * 50 * 2048 * 2048, // 200 KB for a 1365 x 2048 WEBP JPG PNG
  },
  fileFilter: (_req, files, callback) => {
    // Check all files MINE
    for (let i = 0; i < files.length; ++i) {
      if (!MINE_WHITELIST.includes(files[i].mimetype)) {
        return callback(new Error("Only images are allowed"));
      }
    }
    callback(null, true);
  },
}).array("proImages", 5);

export { uploadSingleImg, uploadMultiImg };
