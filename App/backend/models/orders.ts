import { DataTypes, Model } from 'sequelize';
import db from '.';

class Order extends Model {
  public id: number;

  public userId: number;

  public productId: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Order',
  timestamps: true,
});

export default Order;
