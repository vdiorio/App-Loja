import IProduct from "../interface/IProduct";
import Product from "../../models/product";

export default class ProductsService {
  static getAll = async () => {
    const products = await Product.findAll() as Product[];
    return products;
  };
  
  static getById = async (id: string) => {
    const product = await Product.findByPk(id) as Product;
    return product;
  };
  
  static getByCategory = async (category: string) => {
    const product = await Product.findAll({ where: { category } }) as Product[];
    return product;
  };
  
  static updateQuantity = async (id: string, amount: number, replace: boolean = false) => {
    const product = await Product.findByPk(id) as Product;
    const quantity = replace ? amount : (product.quantity + amount);
    if (!product || quantity < 0) return -999
    product.update({quantity});
    return quantity;
  };

  static updateProduct = async (id: string, prod: IProduct) => {
    const product = await Product.findByPk(id) as Product;
    await product.update({prod});
  };

  static createProduct = async (prod: IProduct) => {
    const product = await Product.create({prod});
    return product;
  };
};
