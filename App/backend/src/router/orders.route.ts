import {Router} from 'express';
import middlewares from '../middlewares';

import controllers from '../controllers';

const ordersRoute = Router();

ordersRoute.post(
    '/',
    middlewares.validation.user,
    middlewares.order.validateRequest,
    middlewares.order.validateProducts,
    middlewares.order.validateCoins,
    controllers.order.createOrder,
);

ordersRoute.get(
    '/',
    middlewares.validation.user,
    controllers.order.getById,
);

ordersRoute.get(
    '/admin',
    middlewares.validation.admin,
    controllers.order.getAllOrders,
);

export default ordersRoute;
