import ExceptionHandler from '../exceptions/ExceptionHandler.js';

export default class ResService {
    static create(res, status, data) {
        try {
            res.status(status);
            return res.json(data);
        } catch (err) {
            console.log('Create res error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }
}