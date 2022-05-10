import services from "../services";
import StatusCodes from "http-status-codes"
import { Request, Response } from "express";
require('dotenv').config();

export default class ProductsService {
  static createOrder = async (req:Request, res: Response) => {
    const { id } = req.headers    
    const products = req.body    
    const order = await services.orders.createOrder(id as string, products);
    return res.status(StatusCodes.CREATED).json(order);
  }
};
