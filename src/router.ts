import { Router } from 'express';
import ordersRouter from './routes/orders.routes';
import authRouter from './routes/auth.routes';
import totalCashbackRouter from './routes/totalCashback.routes';
import usersRouter from './routes/users.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/cashback', totalCashbackRouter);

export default routes;
