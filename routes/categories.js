const express = require('express');
const CategoriesService = require('../services/category');

const router = express.Router();
const service = new CategoriesService();

router.get('/:categoryId/products/:productId', (request, response) => {
  const { categoryId, productId } = request.params;
  const categoryByProduct = service.find(categoryId, productId);
  response.json(categoryByProduct);
});

module.exports = router;
