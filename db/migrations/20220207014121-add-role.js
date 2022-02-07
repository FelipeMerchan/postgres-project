'use strict';

const { UserSchema, USER_TABLE } = require('../models/user');

/* Migración para modificar una tabla existente.
  No hay riesgos de sobreescritura como con sequelize.sync. Con la migración
  no vamos a borrar información, solo agrega las modificaciones.
*/

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role', UserSchema.role);
  }
};
