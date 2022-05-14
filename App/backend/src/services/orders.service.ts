
import Order from '../../models/orders';
import OrderProducts from '../../models/orderProducts';
import IOrderProduct from '../interface/IOrderProduct';
import {pivotInfo, IOrder} from '../interface/IOrder';
import services from '.';

function generateResponse(order: IOrder) {
  order.products = order.products.map((p: pivotInfo) => {
    const {product_id, quantity} = p.Order_Products;
    return {
      productId: product_id,
      name: p.name,
      description: p.description,
      quantity,
    } as unknown as pivotInfo;
  });
  return {
    id: order.id,
    userId: order.userId,
    products: order.products,
  };
}

export default class OrderService {
  static getAll = async () => {
    const orders = await Order.findAll({
      include: [{
        association: 'products',
        attributes: ['name'],
      }],
    });
    const response = orders.map((order) => generateResponse(order as unknown as IOrder));
    return response;
  };

  static getByUserId = async (userId: string) => {
    const orders = await Order.findAll({
      include: [{
        association: 'products',
        attributes: ['name'],
      }],
      where: {userId},
    });
    return orders;
  };

  static createOrder = async (userId: string, products: IOrderProduct[], totalPrice: number) => {
    const newOrder = await Order.create({userId});
    const promises = [
      ...products.map(({productId, quantity}) => {
        return OrderProducts.create({order_id: newOrder.id, product_id: productId, quantity});
      }),
      ...products.map(({productId, quantity}) => {
        return services.products.updateQuantity(productId.toString(), -quantity);
      }),
    ];
    await Promise.all(promises);
    const order = await Order.findByPk(newOrder.id, {
      include: [{
        association: 'products',
        attributes: ['name'],
      }],
    }) as unknown as IOrder;
    await services.users.updateCoins(userId, -totalPrice);
    const response = generateResponse(order);
    return response;
  };
}
