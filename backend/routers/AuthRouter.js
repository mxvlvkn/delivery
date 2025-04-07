import {Router} from 'express';
import АuthController from '../controllers/AuthController.js';
const АuthRouter = new Router();

АuthRouter.post('/login', АuthController.login);
АuthRouter.post('/check', АuthController.checkAuth);
АuthRouter.post('/logout', АuthController.logout);

export default АuthRouter;