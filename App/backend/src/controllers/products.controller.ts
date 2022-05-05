import services from "../services";
import StatusCodes from "http-status-codes"
import { Request, Response } from "express";

export default class ProductsService {
  static getAll = async (_req: Request, res: Response) => {
    const products = await services.products.getAll();
    return res.status(StatusCodes.OK).json(products);
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await services.products.getById(id);
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    return res.status(StatusCodes.OK).json(product);
  };

  static getByCategory = async (req: Request, res: Response) => {
    const { category } = req.body
    const products = await services.products.getByCategory(category);
    return res.status(StatusCodes.OK).json(products);
  };

  static createProduct = async (req: Request, res: Response) => {
    const newProduct = req.body
    const product = await services.products.createProduct(newProduct);
    return res.status(StatusCodes.CREATED).json(product);
  };

  static updateProduct = async (req: Request, res: Response) => {
    const newProduct = req.body
    const { id } = req.params
    const product = await services.products.updateProduct(id, newProduct);
    return res.status(StatusCodes.OK).json(product);
  };

  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await services.products.deleteProduct(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  };
};
