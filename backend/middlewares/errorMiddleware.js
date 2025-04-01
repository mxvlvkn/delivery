import ExceptionHandler from '../exceptions/ExceptionHandler.js';
import ResService from '../services/ResService.js';

export default (err, req, res, next) => {
    if (err instanceof ExceptionHandler) {
        return ResService.create(res, err.status, {status: false, msg: err.message})
    }

    return ResService.create(res, 500, {status: false, msg: 'Внутренная ошибка сервера'});
};