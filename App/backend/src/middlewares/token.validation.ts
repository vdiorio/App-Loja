import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export default class TokenValidation {

  static admin = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
      const { role } = jwt.verify(authorization, process.env.JWT_SECRET as string) as jwt.JwtPayload;;
      if (role !== 'admin') return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized action' });
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
  
  static user = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' })
      const { role, id } = jwt.verify(authorization, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      if (role !== 'user' && role !== 'admin') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized action' });
      }
      req.headers.id = id;
      next();
    } catch (e) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized action' });
    }
  }
}
