const express = require('express');

const productsRouter = require('./products.js');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');
const customerRouter = require('./customers');
const orderRouter = require('./orders');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
