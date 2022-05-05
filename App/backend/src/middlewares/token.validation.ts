import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export default class TokenValidation {

  static admin = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
    const { role } = jwt.verify(authorization, process.env.JWT_SECRET as string) as jwt.JwtPayload;;
    if (role !== 'admin') return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized action' });
    next();
  }
  
  static user = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
    const { role, id } = jwt.verify(authorization, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    if (role !== 'user' || role !== 'admin') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized action' });
    }
    req.body.id = id;
    next();
  }
}
