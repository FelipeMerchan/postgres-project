const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order');
const { PRODUCT_TABLE } = require('./product');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /* Le indicamos la foreign key.  */
    references: {
      model: ORDER_TABLE, /* Indica a qué tabla va a ir relacionada */
      key: 'id', /* Indica hacia dónde de la tabla de referencia va a ser referida. Es decir, con qué campo de la tabla user se va a hacer la relación */
    },
    /* Indica las reglas cuando se actualice el ID (si llegase a pasar) */
    onUpdate: 'CASCADE', /* Debe ocurrir un comportamiento en cascada y actualizar el ID*/
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /* Le indicamos la foreign key.  */
    references: {
      model: PRODUCT_TABLE, /* Indica a qué tabla va a ir relacionada */
      key: 'id', /* Indica hacia dónde de la tabla de referencia va a ser referida. Es decir, con qué campo de la tabla user se va a hacer la relación */
    },
    /* Indica las reglas cuando se actualice el ID (si llegase a pasar) */
    onUpdate: 'CASCADE', /* Debe ocurrir un comportamiento en cascada y actualizar el ID*/
    onDelete: 'SET NULL',
  },
}

class OrderProduct extends Model {

  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
