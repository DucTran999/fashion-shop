import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import createError from "http-errors";
import { v4 as uuidv4 } from "uuid";

import corsOptions from "./configs/cors.config.js";
import logger from "./middleware/logger.js";
import apiRouter from "./api/api.route.js";

const createApp = () => {
  const app = express();

  // cross-site origin request share
  app.use(cors(corsOptions));

  // products image
  app.use(express.static("public"));

  // helmet
  // app.use(helmet());

  // Logging
  // app.use(morgan("common"));

  // body-parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (req, res, next) => {
    res.status(200).setHeader("Content-type", "text/html").send("Home page");
  });

  // api routing.
  apiRouter(app);

  // Handle request error
  app.use((req, res, next) => {
    next(createError.NotFound("Not Found!"));
  });

  app.use((err, req, res, next) => {
    // logger(uuidv4(), req, err.message);
    res.status(err.status || 500).json({
      status: "error",
      message: err.message,
    });
  });

  return app;
};

export default createApp;
