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
    return res.status(StatusCodes.OK).json(product);
  };
};
