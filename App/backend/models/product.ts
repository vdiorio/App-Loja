import {DataTypes, Model} from 'sequelize';
import db from '.';

class Product extends Model {
  public id: number;

  public name: string;

  public description: string;

  public imageURL: string;

  public price: number;

  public category: string;

  public quantity: number;
}

Product.init({
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
  description: {
    type: DataTypes.STRING,
    defaultValue: 'Um produto maravilhoso!',
  },
  imageURL: {
    type: DataTypes.STRING,
    defaultValue: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'utensilhos',
  },
  quantity: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
}, {
  sequelize: db,
  modelName: 'Product',
  tableName: 'Products',
  timestamps: true,
  underscored: true,
});

export default Product;
