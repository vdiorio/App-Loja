import { Router } from 'express';
import middlewares from '../middlewares';

import controllers from '../controllers';

const ordersRoute = Router();

ordersRoute.post(
  '/',
  middlewares.validation.user,
  middlewares.order.validateRequest,
  middlewares.order.validateProducts,
  controllers.order.createOrder,
);


export default ordersRoute;
