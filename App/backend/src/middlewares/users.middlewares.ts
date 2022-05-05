import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi = require("joi");

const newUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateCoinsSchema = Joi.object().keys({
  coins: Joi.number().required(),
})

export default class UserMiddlewares {
  static validateNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = newUserSchema.validate(req.body) as Joi.ValidationResult;
    if (error) {
      const { message } = error.details[0]
      return res.status(StatusCodes.BAD_REQUEST).json({message});
    }
    next();
  }

  static validateCoins = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateCoinsSchema.validate(req.body) as Joi.ValidationResult;
    if (error) {
      const { message } = error.details[0]
      return res.status(StatusCodes.BAD_REQUEST).json({message});
    }
    next();
  };
}