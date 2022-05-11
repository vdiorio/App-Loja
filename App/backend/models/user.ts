import {DataTypes, Model} from 'sequelize';
import db from '.';
import Order from './orders';

class User extends Model {
  public id: number;

  public name: string;

  public email: string;

  public password: string;

  public coins: number;

  public role: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true,
  underscored: true,
});

User.hasMany(Order, {foreignKey: 'userId', as: 'orders'});
Order.belongsTo(User);

export default User;
