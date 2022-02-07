/* Este archivo se encarga de enviar la conexión hacia los modelos para hacer el mapeo y serialización de datos */

const { UserSchema, User } = require('./user');
const { CustomerSchema, Customer } = require('./customer');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  /* Debemos ejecutar la asociación después de la inicialización del modelo */
  Customer.associate(sequelize.models)
  User.associate(sequelize.models);
}

module.exports = setUpModels;
