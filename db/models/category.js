const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    /* Una categoría puede tener muchos productos (hasMany)
     */
    this.hasMany(models.Product, {
      as: 'products', /* Alias para resolverlo */
      foreignKey: 'categoryId', /* Indica dónde se resuelve la relación. Va el atributo del modelo Product
      donde se va a hacer esa relación. */
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    }
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
