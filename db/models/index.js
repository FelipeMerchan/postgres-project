/* Este archivo se encarga de enviar la conexión hacia los modelos para hacer el mapeo y serialización de datos */

const { UserSchema, User } = require('./user');
const { CustomerSchema, Customer } = require('./customer');
const { CategorySchema, Category } = require('./category');
const { ProductSchema,  Product } = require('./product');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  /* Debemos ejecutar la asociación después de la inicialización del modelo */
  Customer.associate(sequelize.models)
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setUpModels;
