import {Router} from 'express';
import OrderController from '../controllers/OrderController.js';
const OrderRouter = new Router();

OrderRouter.post('/add', OrderController.addOrder);

export default OrderRouter;