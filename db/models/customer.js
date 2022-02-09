const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user')

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    /* Le indicamos la foreign key.  */
    references: {
      model: USER_TABLE, /* Indica a qué tabla va a ir relacionada */
      key: 'id', /* Indica hacia dónde de la tabla de referencia va a ser referida. Es decir, con qué campo de la tabla user se va a hacer la relación */
    },
    /* Indica las reglas cuando se actualice el ID (si llegase a pasar) */
    onUpdate: 'CASCADE', /* Debe ocurrir un comportamiento en cascada y actualizar el ID*/
    onDelete: 'SET NULL',
  }
}

class Customer extends Model {

  static associate(models) {
    /* Genera la asoción de esta tabla con User
      Podemos ponerle un alias a la relación en el segundo parámetro
      de belongsTo.
      Como es una asociación de tipo belongsTo quiere decir que
      la foreign key debería estar en la tabla de customer.
    */
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
