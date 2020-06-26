import { Router } from 'express';

import TotalCashbackController from '../controllers/TotalCashbackController';
import ensureAuthenticated from '../modules/AuthenticationModule';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const totalCashbackController = new TotalCashbackController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/total_cashback', totalCashbackController.list);
ordersRouter.post('/create', ordersController.create);
ordersRouter.post('/update', ordersController.update);
ordersRouter.post('/delete', ordersController.delete);
ordersRouter.get('/list', ordersController.list);

export default ordersRouter;
