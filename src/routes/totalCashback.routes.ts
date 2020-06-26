import { Router } from 'express';

import TotalCashbackController from '../controllers/TotalCashbackController';
import ensureAuthenticated from '../modules/AuthenticationModule';

const totalCashbackRouter = Router();
const totalCashbackController = new TotalCashbackController();

totalCashbackRouter.use(ensureAuthenticated);

totalCashbackRouter.post('/', totalCashbackController.list);

export default totalCashbackRouter;
