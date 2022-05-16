import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import services from '../services';

export default class UsersController {
  static getAll = async (_req: Request, res: Response) => {
    try {
      const users = await services.users.getAll();
      return res.status(StatusCodes.OK).json(users);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      await services.users.createUser(req.body);
      return res.status(StatusCodes.CREATED).json({message: 'Usuário criado com sucesso!'});
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };

  static updateCoins = async (req: Request, res: Response) => {
    try {
      const {params: {id}, body: {coins}} = req;
      const replace = true;
      const success = await services.users.updateCoins(id, coins, replace);
      const [status, message] = success.split('*');
      return res.status(Number(status)).json({message});
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const {id} = req.headers;
      const user = await services.users.getById(id as string);
      return res.status(StatusCodes.OK).json(user);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Algo deu errado, tente novamente mais tarde'});
    }
  };
}
