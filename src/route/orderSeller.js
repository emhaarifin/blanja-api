const express = require("express");
const route = express.Router();
const orderSeller = require("../controller/orderSeller");

route
    // .get('/', category.getCategory)
    // .get('/:id', category.getCategorybyID)
    .post('/', orderSeller.addOrder)
    // .put('/:id', category.updateCategory)
    // .delete('/:id', category.deleteCategory)

module.exports = route;