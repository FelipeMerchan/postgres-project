/* Este archivo se encarga de enviar la conexión hacia los modelos para hacer el mapeo y serialización de datos */

const { UserSchema, User } = require('./user');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setUpModels;
