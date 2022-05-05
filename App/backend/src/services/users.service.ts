import IProduct from "../interface/IProduct";
import User from "../../models/user";
import { Optional } from "sequelize/types";
import * as bcrypt from 'bcryptjs';

export default class UserService {
  static getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ['id', 'password'] } }) as User[];
    return users;
  };
  
  static getById = async (id: string) => {
    const user = await User.findByPk(id, { attributes: { exclude: ['id', 'password'] } }) as User;
    return user;
  };
  
  static getByRole = async (role: string) => {
    const users = await User.findAll({ where: { role }, attributes: { exclude: ['id', 'password'] } }) as User[];
    return users;
  };

  static updateCoins = async (id: string, amount: number, replace: boolean = false) => {
    const user = await User.findByPk(id);
    if (!user) return '404*User not found';
    const coins = replace ? amount : user.coins + amount;
    if (coins < 0) return '401*Invalid amount'
    await User.update({ coins }, { where: { id } });
    return '200*Coins updated';
  };

  static createUser = async (user: Optional<any, string>) => {
    user.password = bcrypt.hashSync(user.password, 8);
    const createdUser = await User.create(user)
    return createdUser;
  };

  static authenticateUser = async (user: Optional<any, string>) => {
    const { email, password } = user
    const foundUser = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    if (bcrypt.compareSync(password, user.password)) return foundUser;
    return null;
  };
};
