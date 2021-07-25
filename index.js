/* eslint-disable no-undef */
require("dotenv").config();
const createError = require("http-errors");
const cors = require("cors");
const routeV1 = require("./src/route/v1/index");
const routeV2 = require("./src/route/v2/index");
const express = require("express");
const logger = require("morgan");

const port = process.env.DB_PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.header(
    "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // If needed
  res.header("Access-Control-Allow-Credentials", true); // If needed
  next();
});

app.listen(port, () => {
  console.log("server on using port", port);
});

app.use("/v1", routeV1);
app.use("/v2", routeV2);
app.use("/file", express.static("./uploads"));
//  catch error and forward to error handler
app.use(function (req, res, next) {
  next(createError().message);
});

// error handler
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
