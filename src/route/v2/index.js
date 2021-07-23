/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const product = require("./product");
// const category = require("./category");
// const orderSeller = require("./orderSeller");

route.use("/products", product);
// .use("/category", category)
// .use("/orderseller", orderSeller)
// .use("/profile/seller/product", product);

module.exports = route;
