import { Router } from 'express';
import middlewares from '../middlewares';

import controllers from '../controllers';

const userRouter = Router();

userRouter.get(
  '/',
  controllers.user.getAll,
);

userRouter.post(
  '/create',
  middlewares.users.validateNewUser,
  controllers.user.createUser,
)

userRouter.put(
    '/:id',
    middlewares.users.validateCoins,
    controllers.user.updateCoins,  
  )

export default userRouter;
