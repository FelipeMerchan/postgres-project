const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    /* La diferencia entre STRING y TEXT es que este último permite una longitud
    de carateres mayor a STRING */
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /* Le indicamos la foreign key. */
    references: {
      model: CATEGORY_TABLE, /* Indica a qué tabla va a ir relacionada */
      key: 'id', /* Indica hacia dónde de la tabla de referencia va a ser referida. Es decir, con qué campo de la tabla user se va a hacer la relación */
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
};

class Product extends Model {
  static associate(models) {
    /* 1 producto pertenece a una categoría (belongsTo) */
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
