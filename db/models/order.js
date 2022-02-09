const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  /* Sequelize tienen un propiedad para calcular el total de datos calculados}
    este atributo no va a existir realmente en la tabla. Por lo cual el tipo de datos
    es virtual. Se recomienda cuando no hay muchos datos porque se deben recorrer y hacer
    calculos. Si hay demasiados datos lo mejor es escribir una consulta
    donde SQL va a hacer esto de forma mas rapida porque esta calculando directamente en la base de datos.
  */
  total: {
    type: DataTypes.VIRTUAL,
    /* Especifica cómo vamos a calcular este campo. */
    get() {
      /* Este this.items es el nombre que le asignamos en belongsToMany (as: 'items') */
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /* Le indicamos la foreign key. */
    references: {
      model: CUSTOMER_TABLE, /* Indica a qué tabla va a ir relacionada */
      key: 'id', /* Indica hacia dónde de la tabla de referencia va a ser referida. Es decir, con qué campo de la tabla user se va a hacer la relación */
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
