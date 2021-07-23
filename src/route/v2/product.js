/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const product = require("../../controller/v2/product");
const redisChace = require("../../middleware/redis");
const upload = require("../../middleware/multer");

route
  .get("/", redisChace.hitCacheAllProduct, product.getProduct)
  .get("/:id", product.getProductbyID)
  .post("/", upload.single("image"), product.addProduct)
  .put("/:id", product.updateProduct)
  .delete("/:id", product.deleteProduct);

module.exports = route;
