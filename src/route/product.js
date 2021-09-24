/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const product = require('../controller/product');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');

route
  .get('/', product.getProduct)
  .get('/:id', product.getProductbyID)
  .get('/store', auth.verifyAccess, auth.seller, product.getProductByStore)
  .post('/', auth.verifyAccess, auth.seller, upload.single('image'), product.addProduct)
  .put('/:id', auth.verifyAccess, auth.seller, upload.single('image'), product.updateProduct)
  .delete('/:id', auth.verifyAccess, auth.seller, product.deleteProduct);

module.exports = route;
