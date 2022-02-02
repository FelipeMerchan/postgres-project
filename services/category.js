class CategoriesService {
  find(categoryId, productId) {
    this.categoryByProduct = {
      categoryId,
      productId,
    }
    return this.categoryByProduct;
  }
}

module.exports = CategoriesService;
