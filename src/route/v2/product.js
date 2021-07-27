/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const product = require("../../controller/v2/product");
const redisChace = require("../../middleware/redis");
const upload = require("../../middleware/multer");
const auth = require("../../middleware/auth");

route
  .get("/", redisChace.hitCacheAllProduct, product.getProduct)
  .get("/:id", product.getProductbyID)
  .post("/", upload.single("image"), auth.seller, product.addProduct)
  .put("/:id", upload.single("image"), product.updateProduct)
  .delete("/:id", auth.seller, product.deleteProduct);

module.exports = route;
