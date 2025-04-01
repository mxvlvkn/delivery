import {} from 'dotenv/config'
import bcrypt from 'bcrypt';
import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import DBService from '../services/DBService.js';
import TokenService from '../services/TokenService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'
const passSalt = process.env.passSalt;


export default class AuthController {
    constructor() {
        //this.sendEmailCode = this.sendEmailCode.bind(this);
    }

    static async login(req, res, next) {
        try {
            const UserData = req.body;

            // Проверяем валидность данных
            const ValidData = ValidationService.login(UserData)

            if (!ValidData.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            // Получаем пользователя из бд
            const DBUserDataRes = (await DBService.getUserByLogin(UserData.login));


            if (!DBUserDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            if (!DBUserDataRes.data.length) {
                throw ExceptionHandler.BadRequest('Такого пользователя не существует');
            }

            const DBUserData = DBUserDataRes.data[0];   

            // Проверяем пароль
            // const IsPassEquals = await bcrypt.compare(userData.pass, bdUserData.pass);
            const IsPassEquals = DBUserData.password === UserData.password;

            if (!IsPassEquals) {
                throw ExceptionHandler.BadRequest('Неверный пароль');
            }

            return await TokenService.pushToken(res, DBUserData.login, DBUserData.id);
        } catch (error) {
            console.log('Login error: ' + error.message);
            next(error);
        }
    }
    static async checkAuth(req, res, next) {
        try {
            const AccessToken = req.cookies.AccessToken;

            await TokenService.validateAccessToken(AccessToken);
            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            next(error);
        }
    }
}