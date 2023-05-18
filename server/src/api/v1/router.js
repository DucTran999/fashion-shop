import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./users/user.route.js";

dotenv.config();
const route = express.Router();

route.use("/users", userRouter);

route.use("/", (req, res, next) => {
  res.status(200);
  res.json({
    status: "success",
    message: null,
    links: [
      {
        docs: "link docs",
      },
    ],
  });
});

export default route;
