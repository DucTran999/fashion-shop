import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./users/user.route.js";
import categoryRouter from "./categories/category.route.js";
import sizeRouter from "./sizes/size.route.js";
import colorRouter from "./colors/colors.route.js";
import productRouter from "./products/product.route.js";
import uploadRouter from "./upload/upload.route.js";
import variantRouter from "./variants/variant.route.js";
import cartRouter from "./cart/cart.route.js";
import ordersRouter from "./orders/orders.route.js";
import sessionRouter from "./sessions/session.route.js";
import notificationRouter from "./notifications/notification.route.js";

dotenv.config();
const route = express.Router();

route.use("/sessions", sessionRouter);

route.use("/users", userRouter);

route.use("/categories", categoryRouter);

route.use("/sizes", sizeRouter);

route.use("/colors", colorRouter);

route.use("/products", productRouter);

route.use("/uploads", uploadRouter);

route.use("/variants", variantRouter);

route.use("/carts", cartRouter);

route.use("/orders", ordersRouter);

route.use("/notifications", notificationRouter);

route.use("/", (req, res, next) => {
  res.status(200);
  res.json({
    status: "success",
    message: null,
    links: [
      {
        docs: "api v1",
      },
    ],
  });
});

export default route;
