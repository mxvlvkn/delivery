import {Router} from 'express';
import ProductController from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ProductRouter = new Router();

ProductRouter.post('/add', authMiddleware, ProductController.createPost);

export default ProductRouter;