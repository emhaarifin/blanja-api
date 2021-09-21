/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const product = require('../controller/product');
const redisChace = require('../middleware/redis');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');

route
  .get('/', redisChace.hitCacheAllProduct, product.getProduct)
  .get('/:id', redisChace.hitCacheProductId, product.getProductbyID)
  .post(
    '/',
    auth.verifyAccess,
    auth.seller,
    redisChace.clearRedisProductById,
    redisChace.clearRedisProduct,
    upload.single('image'),
    product.addProduct
  )
  .put(
    '/:id',
    auth.verifyAccess,
    auth.seller,
    redisChace.clearRedisProductById,
    redisChace.clearRedisProduct,
    upload.single('image'),
    product.updateProduct
  )
  .delete(
    '/:id',
    auth.verifyAccess,
    auth.seller,
    redisChace.clearRedisProductById,
    redisChace.clearRedisProduct,
    product.deleteProduct
  );

module.exports = route;
