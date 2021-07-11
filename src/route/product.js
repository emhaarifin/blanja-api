const express = require("express");
const route = express.Router();
const product = require("../controller/product");

route
    .get('/', product.getProduct)
    .get('/:id', product.getProductbyID)
    .post('/', product.addProduct)
    .put('/:id', product.updateProduct)
    .delete('/:id', product.deleteProduct)

module.exports = route;