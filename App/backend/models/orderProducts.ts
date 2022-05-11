import {DataTypes, Model} from 'sequelize';
import db from '.';
import Order from './orders';
import Product from './product';

class OrderProducts extends Model {
  public orderId: number;

  public productId: number;

  public quantity: number;
}

OrderProducts.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Order_Products',
  tableName: 'Order_Products',
  timestamps: false,
  underscored: true,
});

Order.belongsToMany(Product, {through: OrderProducts, foreignKey: 'order_id', as: 'products'});
Product.belongsToMany(Order, {through: OrderProducts, foreignKey: 'product_id'});

export default OrderProducts;
