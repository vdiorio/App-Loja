import { Router } from 'express';
import middlewares from '../middlewares';

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

productRouter.put(
  '/:id',
  middlewares.products.validateUpdateProduct,
  controllers.product.updateProduct,
)

productRouter.post(
  '/',
  middlewares.products.validateNewProduct,
  controllers.product.createProduct,
)

productRouter.delete(
  '/:id',
  controllers.product.deleteProduct,
)

export default productRouter;
