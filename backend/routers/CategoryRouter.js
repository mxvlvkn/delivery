import {Router} from 'express';
import CategoryController from '../controllers/CategoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const CategoryRouter = new Router();

CategoryRouter.post('/add', authMiddleware, CategoryController.addCategory);
CategoryRouter.post('/getAll', authMiddleware, CategoryController.getCategories);
CategoryRouter.post('/delete', authMiddleware, CategoryController.deleteCategory);
CategoryRouter.post('/get', authMiddleware, CategoryController.getCategory);
CategoryRouter.post('/set', authMiddleware, CategoryController.setCategory);
CategoryRouter.post('/add-product-to-category', authMiddleware, CategoryController.addProductToCategory);
CategoryRouter.post('/delete-product-from-category', authMiddleware, CategoryController.deleteProductFromCategory);
CategoryRouter.post('/get-menu', authMiddleware, CategoryController.getMenu);


export default CategoryRouter;