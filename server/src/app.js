import express from "express";
import helmet from "helmet";
import cors from "cors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";

import corsOptions from "./configs/cors.config.js";
import ipFilter from "./middleware/ipFilter.js";
import apiRouter from "./api/api.route.js";

const createApp = () => {
  const app = express();

  // cross-site origin request share
  app.use(cors(corsOptions));

  // public products image
  app.use(express.static("public"));

  // hiding some information about server
  if (process.env.NODE_ENV === "production") app.use(helmet());

  // filter IP
  app.use(async (req, res, next) => ipFilter.refuseBlackIp(req, res, next));

  // body-parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (req, res, next) => {
    res.status(200).setHeader("Content-type", "text/html").send("Home page");
  });

  // api routing.
  apiRouter(app);

  // Error handler middleware
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: "error",
      message: err.message,
    });
  });

  return app;
};

export default createApp;
