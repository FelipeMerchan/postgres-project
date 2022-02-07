'use strict';

const { UserSchema, USER_TABLE } = require('../models/user');

module.exports = {
  /* Va a hacer la creación */
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  /* Permite revertir cambios. Es como volver hacia atrás como en Git*/
  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE);
  }
};
