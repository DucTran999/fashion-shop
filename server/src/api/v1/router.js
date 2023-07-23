import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./user/user.route.js";
import categoryRouter from "./category/category.route.js";
import sizeRouter from "./size/size.route.js";
import colorRouter from "./colors/colors.route.js";
import productRouter from "./products/product.route.js";
import uploadRouter from "./upload/upload.route.js";
import variantRouter from "./variants/variant.route.js";
import cartRouter from "./cart/cart.route.js";
import ordersRouter from "./order/order.route.js";
import sessionRouter from "./session/session.route.js";
import notificationRouter from "./notification/notification.route.js";
import emailRouter from "./email/email.route.js";
import wishlistRouter from "./wishlist/wishlist.route.js";

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

route.use("/emails", emailRouter);

route.use("/wishlists", wishlistRouter);

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
