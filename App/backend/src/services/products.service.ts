import product from "../../models/product";

export default class ProductsService {
  static getAll = async () => {
    const products = await product.findAll();
    return products;
  };
};
