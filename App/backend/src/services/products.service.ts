import Product from "../../models/product";

export default class ProductsService {
  static getAll = async () => {
    const products = await Product.findAll();
    return products;
  };
};
