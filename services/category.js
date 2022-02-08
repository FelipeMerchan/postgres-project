const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }

  async create(data) {
    return [];
  }

  async find() {
    return [];
  }

  async findOne(id) {
    return [];
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
