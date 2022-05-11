import services from '../services';
import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

const jwtConfig: jwt.SignOptions = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

export default class ProductsService {
  static main = async (req: Request, res: Response) => {
    try {
      const user = await services.users.authenticateUser(req.body);
      if (!user) return res.status(404).json({message: 'Wrong email or password'});
      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET as string, jwtConfig);
      return res.status(StatusCodes.OK).json({token});
    } catch (_e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };
};
