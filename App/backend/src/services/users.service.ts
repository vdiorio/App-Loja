import IProduct from "../interface/IProduct";
import User from "../../models/user";
import { Optional } from "sequelize/types";
import * as bcrypt from 'bcryptjs';

export default class UserService {
  static getAll = async () => {
    const users = await User.findAll() as User[];
    return users;
  };
  
  static getById = async (id: string) => {
    const user = await User.findByPk(id) as User;
    return user;
  };
  
  static getByRole = async (role: string) => {
    const users = await User.findAll({ where: { role } }) as User[];
    return users;
  };

  static updatePassword = async (id: string, password: string) => {
    bcrypt.hashSync(password, 8)
    const product = await User.update({ password }, { where: { id } });
    return product
  };

  static createUser = async (user: Optional<any, string>) => {
    user.password = bcrypt.hashSync(user.password, 8);
    const createdUser = await User.create(user)
    return createdUser;
  };

  static authenticateUser = async (user: Optional<any, string>) => {
    const { email, password } = user
    const foundUser = await User.findOne({ where: { email } });
    if (bcrypt.compareSync(password, user.password)) return foundUser;
    return null;
  };
};
