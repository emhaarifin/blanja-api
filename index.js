/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();
const createError = require('http-errors');
const cors = require('cors');
const route = require('./src/route');
const express = require('express');
const logger = require('morgan');
const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', route);
app.use('/file', express.static('./uploads'));
//  catch error and forward to error handler

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});

app.listen(port, () => {
  console.log('server on using port', port);
});

module.exports = app;
