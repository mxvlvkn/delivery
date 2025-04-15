import {Router} from 'express';
import ProductController from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ProductRouter = new Router();

ProductRouter.post('/add', authMiddleware, ProductController.addProduct);
ProductRouter.post('/getAll', authMiddleware, ProductController.getProducts);
ProductRouter.post('/delete', authMiddleware, ProductController.deleteProduct);
ProductRouter.post('/get', ProductController.getProduct);
ProductRouter.post('/set', authMiddleware, ProductController.setProduct);

export default ProductRouter;