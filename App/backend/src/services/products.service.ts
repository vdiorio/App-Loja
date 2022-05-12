import IProduct from '../interface/IProduct';
import Product from '../../models/product';
import {Optional} from 'sequelize/types';

export default class ProductsService {
  static getAll = async () => {
    const products = await Product.findAll() as Product[];
    return products;
  };

  static getById = async (id: string) => {
    const product = await Product.findByPk(id) as Product;
    return product;
  };

  static updateQuantity = async (id: string, amount: number, replace: boolean = false) => {
    const product = await Product.findByPk(id) as Product;
    const quantity = replace ? amount : (product.quantity + amount);
    if (!product || quantity < 0) return -999;
    product.update({quantity});
    return quantity;
  };

  static updateProduct = async (id: string, values: IProduct) => {
    const [product] = await Product.update(values, {where: {id}});
    return product;
  };

  static createProduct = async (values: Optional<any, string>) => {
    const product = await Product.create(values);
    return product;
  };

  static deleteProduct = async (id: string) => {
    const affectedRows = await Product.destroy({where: {id}});
    return affectedRows;
  };
};
