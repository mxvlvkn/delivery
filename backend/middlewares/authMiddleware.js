import ExceptionHandler from '../exceptions/ExceptionHandler.js';
import TokenService from '../services/TokenService.js';

export default async (req, res, next) => {
    try {
        const AccessToken = req.cookies.AccessToken;
        await TokenService.validateAccessToken(AccessToken);
        next();
    } catch (error) {
        next(ExceptionHandler.UnauthorizedError());
    }
}