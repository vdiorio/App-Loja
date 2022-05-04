'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  Orders.init({
    id: DataTypes.NUMBER,
    userId: DataTypes.NUMBER,
    productId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};