import { Router } from 'express';

import controllers from '../controllers';

const productRouter = Router();

productRouter.get(
  '/category',
  controllers.product.getByCategory,
)

productRouter.get(
  '/',
  controllers.product.getAll,
);

productRouter.get(
  '/:id',
  controllers.product.getById,
)

productRouter.post(
  '/:id',
  controllers.product.updateProduct,
)

productRouter.delete(
  '/:id',
  controllers.product.deleteProduct,
)

export default productRouter;
