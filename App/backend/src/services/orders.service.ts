
import Order from '../../models/orders';
import OrderProducts from '../../models/orderProducts';
import IOrderProduct from '../interface/IOrderProduct';
import Product from '../../models/product';
import { pivotInfo, IOrder } from '../interface/IOrder';

export default class OrderService {
  static getById = async (orderId: string) => {
    const order = await Order.findAll({
      where: { orderId },
      attributes: { exclude: ['orderId'] }
    });
    return order;
  }

  static createOrder = async (userId: string, products: IOrderProduct[]) => {
    const newOrder = await Order.create({ userId });
    const promises = products.map(({ productId, quantity }) => {
      return OrderProducts.create({ order_id: newOrder.id, product_id: productId, quantity })
    });
    await Promise.all(promises);
    const order = await Order.findByPk(newOrder.id,
      { include: [{
          association: 'products',
          attributes: ['name', 'description']
        }]
      }) as unknown as IOrder;
    order.products = order.products.map((p: pivotInfo) => {
      const { product_id, quantity } = p.Order_Products
      return {
        productId: product_id,
        name: p.name,
        quantity
      } as unknown as pivotInfo
    });
    return {
      id: order.id,
      userId: order.userId,
      products: order.products
    };
  }
}
