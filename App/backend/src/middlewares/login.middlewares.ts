import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import Joi = require('joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default class ProductMiddlewares {
  static validateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = loginSchema.validate(req.body) as Joi.ValidationResult;
    if (error) {
      const {message} = error.details[0];
      return res.status(StatusCodes.BAD_REQUEST).json({message});
    }
    next();
  };
}
