import {Router} from 'express';
import middlewares from '../middlewares';

import controllers from '../controllers';

const loginRouter = Router();

loginRouter.post(
    '/',
    middlewares.login.validateRequest,
    controllers.login.main,
);


export default loginRouter;
