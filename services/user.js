const boom = require('@hapi/boom');

/* Cada vez que hacemos está configuración: User.init(UserSchema, User.config(sequelize));
  Sequelize crea un namespace llamados models en donde va a guardar todos
  los modelos; por ejemplo, models.User.
*/
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'], /* Incluirá a la asociación */
    }); // Ejecuta la conexión del modelo que cree
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id); // Busca por el primary key (findByPk)
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
