'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer');

module.exports = {
  /* Va a hacer la creación */
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  /* Permite revertir cambios. Es como volver hacia atrás como en Git*/
  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
