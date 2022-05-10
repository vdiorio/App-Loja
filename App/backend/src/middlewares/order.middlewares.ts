import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import Joi = require('joi');
import services from '../services';

const loginSchema = Joi.array().items(Joi.object().keys({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
}));

export default class OrderMiddlewares {
  static validateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = loginSchema.validate(req.body) as Joi.ValidationResult;
    if (error) {
      const {message} = error.details[0];
      return res.status(StatusCodes.BAD_REQUEST).json({message});
    }
    next();
  };

  static validateProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = req.body;
    let totalPrice = 0;
    for ( const p of products ) {
      const product = await services.products.getById(p.productId);
      if (!product) return res.status(StatusCodes.NOT_FOUND).json({message: 'Product not found'});
      if (product.quantity - p.quantity < 0) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'No products enough in stock'});
      }
      totalPrice += product.price;
    }
    req.headers.price = totalPrice.toString();
    next();
  };

  static validateCoins = async (req: Request, res: Response, next: NextFunction) => {
    const price = Number(req.headers.price);
    const {id} = req.headers;
    const {coins} = await services.users.getById(id as string);
    if (coins - price < 0) return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Not enough funds'});
    next();
  };
}
