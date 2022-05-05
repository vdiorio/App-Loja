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
};
