const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users'

const UserSchema = {
  id : {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  }
}


class User extends Model {
  static associate() {
    //associate
  }

  /* Configuración  */
  static config(sequelize) {
    return {
      sequelize, // Cuál va a ser la conexión que va a tener
      tableName: USER_TABLE, // Nombre de la tabla
      modelName: 'User', // Nombre del modelo
      timestamps: false, // Empezar a crear campos por defecto
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
