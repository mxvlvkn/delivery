import express from 'express';
import cookieParser from 'cookie-parser';
import AuthRouter from './routers/AuthRouter.js';
import ProductRouter from './routers/ProductRouter.js';
import CorsService from './services/CorsService.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { fileURLToPath } from 'url';
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const PORT = 5000;
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
CorsService.set(app);

app.use('/auth/', AuthRouter);
app.use('/products/', ProductRouter);
app.use(errorMiddleware);

function start() {
    try {
        app.listen(PORT, () => console.log('Server start on ' + PORT + ' port'));
    } catch (error) {
        console.log('Error:' + error);
    }
}
start();