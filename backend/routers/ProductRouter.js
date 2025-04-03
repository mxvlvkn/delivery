import {Router} from 'express';
import ProductController from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ProductRouter = new Router();

ProductRouter.post('/add', authMiddleware, ProductController.addProduct);

export default ProductRouter;