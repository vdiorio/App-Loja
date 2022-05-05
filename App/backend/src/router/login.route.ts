import { Router } from 'express';
import middlewares from '../middlewares';

import controllers from '../controllers';

const loginRouter = Router();

loginRouter.get(
  '/',
  middlewares.login.validateRequest,
  controllers.login.main,
);


export default loginRouter;
