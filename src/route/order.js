/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const order = require('../controller/order');

route
  .get('/', order.getOrder)
  .get('/:id', order.getOrderbyID)
  .post('/', order.addOrder)
  .put('/:id', order.updateOrder)
  .delete('/:id', order.deleteOrder);

module.exports = route;
