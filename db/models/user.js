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
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      /* Como la relación está del lado del customer aquí debemos
      Indicarle cómo la va a encontrar a través del foreignKey.
      De esta maenar desde la tabla Customer hay una relación userId y ahí es
      donde se va a resolver la relación. Y al hacer una petición al endpoint de user
      se va a anexar en la respuesta el objeto customer que tenga relacionado.
      */
      foreignKey: 'userId',
    });
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
