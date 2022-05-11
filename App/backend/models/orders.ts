import {DataTypes, Model} from 'sequelize';
import db from '.';

class Order extends Model {
  public id: number;

  public userId: number;

  public productId: number;
}

Order.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Order',
  tableName: 'Orders',
  timestamps: true,
  underscored: true,
});

export default Order;
