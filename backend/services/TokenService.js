import jwt from 'jsonwebtoken';
import DBService from '../services/DBService.js';
import ResService from '../services/ResService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js';

export default class TokenService {
    constructor() {
        this.generateTokens = this.generateTokens.bind(this);
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.deleteAccessTokenFromDB = this.deleteAccessTokenFromDB.bind(this);
    }

    static generateAccessToken(payload) {
        try {
            const AccessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '60d'});

            if (!AccessToken) {
                throw ExceptionHandler.InternalServerError();
            }

            return AccessToken;
        } catch (err) {
            console.log('Generate access token error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }

    static async pushToken(res, login, id = -1) {
        try {
            if (id === -1) {
                const IDData = await DBService.getUserIdByLogin(login);
                if (!IDData.status) throw ExceptionHandler.InternalServerError();
                id = IDData.data;
            }

            const AccessToken = this.generateAccessToken({
                id,
                login
            });

            if (!(await DBService.saveToken(id, AccessToken)).status) throw ExceptionHandler.InternalServerError();

            res.cookie('AccessToken', AccessToken, {maxAge: 2 * 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return ResService.create(res, 200, {
                status: true,
                msg: 'OK',
                data: []
            });
        } catch (err) {
            console.log('Push tokens error: ' + err);
            throw ExceptionHandler.InternalServerError();
        }
    }   
    static async validateAccessToken(token) {
        try {
            try {
                jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            } catch {
                await this.deleteAccessTokenFromDB(token);
                throw ExceptionHandler.UnauthorizedError();
            }

            const isTokenExist = (await DBService.getIsTokenExist(token)).status;

            if (!isTokenExist) {
                await DBService.deleteToken(token);
                throw ExceptionHandler.UnauthorizedError();
            }
        } catch(err) {  
            throw err || ExceptionHandler.InternalServerError();
        }
    }
    static async deleteAccessTokenFromDB(token) {
        try {
            const isTokenExist = (await DBService.getIsTokenExist(token)).status;
            
            if (isTokenExist) {
                await DBService.deleteToken(token);
            }
        } catch (error) {
            console.log('Delete token from DB error');
        }
    }
}