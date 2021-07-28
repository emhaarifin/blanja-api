/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const user = require("../../controller/v2/user");

route
  .post("/login", user.login)
  .post("/register/custommer", user.registerCus)
  .post("/register/seller", user.registerSeller)

  .get("/actived/:token", user.activactions);

module.exports = route;
