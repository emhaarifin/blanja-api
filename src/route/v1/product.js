/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const product = require("../../controller/v1/product");

route
  .get("/", product.getProduct)
  .get("/:id", product.getProductbyID)
  .post("/", product.addProduct)
  .put("/:id", product.updateProduct)
  .delete("/:id", product.deleteProduct);

module.exports = route;
