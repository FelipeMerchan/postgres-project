const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const client = await getConnection(); //Ejecuta la conexión
    const rta = await client.query('SELECT * FROM tasks'); //Realiza una consulta
    return rta.rows; //Número de filas que hay en la tabla
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
