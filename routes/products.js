const express = require('express');
const ProductsService = require('../services/product');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('../schemas/product');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.send('Soy un filter')
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await service.findOne(id);
    response.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (request, response) => {
  try {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    })
  }
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const product = await service.update(id, body);
    response.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const product = await service.update(id, body);
    response.json(product);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const product = await service.delete(id);
    response.json(product);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
