/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const product = require("../controller/product");
const productsV2 = require("../controller/v2/product");
const redisChace = require("../middleware/redis");

route
  //   .get("/", product.getProduct)
  .get("/", redisChace.hitCacheAllProduct, productsV2.getProduct)
  .get("/:id", product.getProductbyID)
  .post("/", product.addProduct)
  .put("/:id", product.updateProduct)
  .delete("/:id", product.deleteProduct);

module.exports = route;
