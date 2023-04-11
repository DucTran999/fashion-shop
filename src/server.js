import express from "express";
import morgan from "morgan";
import configViewEngine from "./configs/viewEngines.js";
import * as dotenv from "dotenv";
dotenv.config();

let app = express();
const port = process.env.PORT || 8080;

// Logging
// app.use(morgan("common"));

// app.use(morgan("combined"));
configViewEngine(app);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
