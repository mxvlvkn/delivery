import {Router} from 'express';
import АuthController from '../controllers/AuthController.js';
const АuthRouter = new Router();

АuthRouter.post('/login', АuthController.login);
АuthRouter.post('/check', АuthController.checkAuth);

export default АuthRouter;