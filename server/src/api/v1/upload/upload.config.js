import multer from "multer";

const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/product");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export { storageProduct };
