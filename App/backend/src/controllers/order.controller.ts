import services from '../services';
import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';
require('dotenv').config();

export default class ProductsService {
  static createOrder = async (req:Request, res: Response) => {
    try {
      const {id, price} = req.headers;
      const products = req.body;
      const order = await services.orders.createOrder(id as string, products, Number(price));
      return res.status(StatusCodes.CREATED).json(order);
    } catch (_e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };

  static getAllOrders = async (req:Request, res: Response) => {
    try {
      const orders = await services.orders.getAll();
      return res.status(StatusCodes.OK).json(orders);
    } catch (_e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };

  static getById = async (req:Request, res: Response) => {
    try {
      const {id} = req.headers;
      const orders = await services.orders.getByUserId(id as string);
      return res.status(StatusCodes.OK).json(orders);
    } catch (_e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };
};
