/* eslint-disable no-undef */
const express = require("express");
const route = express.Router();
const orderSeller = require("../../controller/v1/orderSeller");

route
  .get("/", orderSeller.getOrder)
  .get("/:id", orderSeller.getOrderbyID)
  .post("/", orderSeller.addOrder)
  .put("/:id", orderSeller.updateOrder)
  .delete("/:id", orderSeller.deleteOrder);

module.exports = route;
