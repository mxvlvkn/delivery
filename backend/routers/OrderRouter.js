import {Router} from 'express';
import OrderController from '../controllers/OrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const OrderRouter = new Router();

OrderRouter.post('/add', OrderController.addOrder);
OrderRouter.post('/get', authMiddleware, OrderController.getOrder);
OrderRouter.post('/set-status', authMiddleware, OrderController.setStatus);
OrderRouter.get('/fill', OrderController.fill);

export default OrderRouter;