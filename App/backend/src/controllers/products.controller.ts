import services from '../services';
import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';

export default class ProductsService {
  static getAll = async (_req: Request, res: Response) => {
    try {
      const products = await services.products.getAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const product = await services.products.getById(id);
      if (!product) return res.status(StatusCodes.NOT_FOUND).json({message: 'Product not found'});
      return res.status(StatusCodes.OK).json(product);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  };

  static createProduct = async (req: Request, res: Response) => {
    try {
      const newProduct = req.body;
      const product = await services.products.createProduct(newProduct);
      return res.status(StatusCodes.CREATED).json(product);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    try {
      const newProduct = req.body;
      const {id} = req.params;
      const affectedRows = await services.products.updateProduct(id, newProduct);
      if (!affectedRows) return res.status(StatusCodes.NOT_FOUND).json({message: 'Product not found'});
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const affectedRows = await services.products.deleteProduct(id);
      if (!affectedRows) return res.status(StatusCodes.NOT_FOUND).json({message: 'Product not found'});
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  };
};
