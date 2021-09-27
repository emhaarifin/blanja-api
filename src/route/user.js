/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const route = express.Router();
const user = require('../controller/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

route
  .post('/login', user.login)
  .post('/register/custommer', user.registerCus)
  .post('/register/seller', user.registerSeller)
  .post('/refreshtoken', user.refreshToken)
  .put('/profile/update/', auth.verifyAccess, upload.single('avatar'), user.updateProfile)
  .get('/actived/:token', user.activactions)
  .get('/profile/:id', user.getUserByID);

module.exports = route;
