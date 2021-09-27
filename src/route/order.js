/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const order = require('../controller/order');
const auth = require('../middleware/auth');
route
  .get('/', auth.verifyAccess, order.getOrder)
  .get('/:id', order.getOrderbyID)
  .post('/', auth.verifyAccess, order.addOrder)
  .put('/:id', order.updateOrder)
  .delete('/:id', order.deleteOrder);

module.exports = route;
