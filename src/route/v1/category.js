/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const category = require("../../controller/v1/category");

route
  .get("/", category.getCategory)
  .get("/:id", category.getCategorybyID)
  .post("/", category.addCategory)
  .put("/:id", category.updateCategory)
  .delete("/:id", category.deleteCategory);

module.exports = route;
