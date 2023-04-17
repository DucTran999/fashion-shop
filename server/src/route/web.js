import express from "express";
import siteRouter from "./site.route.js";

const router = express.Router();

const initWebRoute = (app) => {
  app.use("/", siteRouter);
};

export default initWebRoute;
