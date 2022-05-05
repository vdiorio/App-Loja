import services from "../services";
import StatusCodes from "http-status-codes"
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export default class ProductsService {
  static main = async(req: Request, res: Response) => {
    const user = services.users.authenticateUser(req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const token = jwt.sign(user, process.env.JWT_SECRET as string);
    return res.status(StatusCodes.OK).json({ token });
  };
};
