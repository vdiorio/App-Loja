import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import Joi = require('joi');

const newProductSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageURL: Joi.string(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
});

const editProductSchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  imageURL: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string(),
  quantity: Joi.number().min(0),
});

export default class ProductMiddlewares {
  static validateNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = newProductSchema.validate(req.body) as Joi.ValidationResult;
    if (error) {
      const {message} = error.details[0];
      return res.status(StatusCodes.BAD_REQUEST).json({message});
    }
    next();
  };

  static validateUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = editProductSchema.validate(req.body) as Joi.ValidationResult;
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(error.details[0].message);
    next();
  };
}
