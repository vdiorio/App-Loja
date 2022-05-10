import services from '../services';
import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';
require('dotenv').config();

export default class ProductsService {
  static createOrder = async (req:Request, res: Response) => {
    const {id, price} = req.headers;
    const products = req.body;
    const order = await services.orders.createOrder(id as string, products, Number(price));
    return res.status(StatusCodes.CREATED).json(order);
  };

  static getAllOrders = async (req:Request, res: Response) => {
    const orders = await services.orders.getAll();
    return res.status(StatusCodes.OK).json(orders);
  };

  static getById = async (req:Request, res: Response) => {
    const {id} = req.headers;
    const orders = await services.orders.getByUserId(id as string);
    return res.status(StatusCodes.OK).json(orders);
  };
};
