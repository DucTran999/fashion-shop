import express from "express";
import morgan from "morgan";
import configViewEngine from "./configs/viewEngines.js";
import initWebRoute from "./route/web.js";

import * as dotenv from "dotenv";
dotenv.config();

let app = express();
const port = process.env.PORT || 8080;

// Logging
// app.use(morgan("common"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// Routing
initWebRoute(app);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
