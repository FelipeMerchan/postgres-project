const express = require('express');

const OrderService = require('../services/order');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order');

const router = express.Router();
const service = new OrderService();

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params;
    const order = await service.findOne(id);
    response.json(order);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (request, response) => {
  try {
    const body = request.body;
    const newOrder = await service.create(body);
    response.status(201).json(newOrder);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    })
  }
});

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (request, response) => {
  try {
    const body = request.body;
    const newItem = await service.addItem(body);
    response.status(201).json(newItem);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    })
  }
});

module.exports = router;
