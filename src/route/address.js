/* eslint-disable no-undef */

const express = require('express');
const address = require('../controller/address');
const auth = require('../middleware/auth');
const router = express.Router();

router
  .post('/', auth.verifyAccess, address.createAddress)
  .get('/', auth.verifyAccess, address.getItemAddress)
  .post('/:id', auth.verifyAccess, address.updateAddress);

module.exports = router;
