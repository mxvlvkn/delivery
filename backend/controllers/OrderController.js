import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import DBService from '../services/DBService.js';
import TokenService from '../services/TokenService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'

export default class OrderController {
    constructor() {
        //this.sendEmailCode = this.sendEmailCode.bind(this);
    }

    static async addOrder(req, res, next) {
        try {
            const ReqData = req.body;
            console.log(ReqData)

            const ValidData = ValidationService.addOrder(ReqData);
            if (!ValidData.status) {
                console.log('Invalid data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            let finalPrice = 0;

            try {
                finalPrice = ReqData.cart.reduce((sum, item) => sum + (item.price * item.count), 0);
            } catch (error) {
                console.log('Invalid cart');
                throw ExceptionHandler.BadRequest("Непредвиденная ошибка");
            }

            //! Нужна транзакция
            console.log(finalPrice)
            
            // const DBDataRes = (await DBService.addCategory(VALUES));
            // if (!DBDataRes.status) {
            //     console.log('Database error')
            //     throw ExceptionHandler.InternalServerError();
            // }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}