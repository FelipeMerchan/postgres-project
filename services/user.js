const boom = require('@hapi/boom');

/* Cada vez que hacemos está configuración: User.init(UserSchema, User.config(sequelize));
  Sequelize crea un namespace llamados models en donde va a guardar todos
  los modelos; por ejemplo, models.User.
*/
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const rta = await models.User.findAll(); // Ejecuta la conexión del modelo que cree
    return rta;
  }

  async findOne(id) {
    return { id };
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

module.exports = UserService;
