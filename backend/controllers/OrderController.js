import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import DBService from '../services/DBService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'

export default class OrderController {
    constructor() {
        // OrderController.getRandomInt = OrderController.getRandomInt.bind(this);
        this.addOrderFill = this.addOrderFill.bind(this);
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

            const DBBeginTransRes = (await DBService.beginTransaction());
            if (!DBBeginTransRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            const DBAddOrderRes = (await DBService.addOrder({
                ...Object.fromEntries(Object.entries(ReqData).filter(([key]) => key !== 'cart')),
                price: finalPrice,
                status: '1get',
                order_date: ReqData.date,
                order_time: ReqData.time

            }));
            if (!DBAddOrderRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            const DBAddCartRes = (await DBService.addCartOrder(ReqData.cart, DBAddOrderRes.data.id));
            if (!DBAddCartRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            const DBCommitTransRes = (await DBService.commitTransaction());
            if (!DBCommitTransRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            try {
                await DBService.cancelTransaction()
            } catch (error) {
                console.log('Add order: cancel transaction err !!!');
            }

            console.log(error)
            next(error);
        }
    }
    static async getOrder(req, res, next) {
        try {

            const DBDataRes = (await DBService.getOrders());
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {
                data: DBDataRes.data,
                message: 'OK'
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async setStatus(req, res, next) {
        try {
            const Data = req.body;

            const ValidData = ValidationService.setOrderStatus(Data);
            if (!ValidData.status) {
                console.log('Invalid data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            const DBDataRes = (await DBService.setOrderStatusByID(Data));
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {
                data: DBDataRes.data,
                message: 'OK'
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static async addOrderFill(req) {
        try {
            const ReqData = req;

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

            const DBAddOrderRes = (await DBService.addOrder({
                ...Object.fromEntries(Object.entries(ReqData).filter(([key]) => key !== 'cart')),
                price: finalPrice,
                status: '3done',
                order_date: new Date().toISOString().split('T')[0],
                order_time: new Date().toTimeString().split(' ')[0]

            }));
            if (!DBAddOrderRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            const DBAddCartRes = (await DBService.addCartOrder(ReqData.cart, DBAddOrderRes.data.id));
            if (!DBAddCartRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

        } catch (error) {
            console.log(error)
        }
    }
    static async fill(req, res, next) {
        const Names = [
            'Макс',
            'Иван',
            'Аня',
            'Коля',
            'Илья',
            'Витя',
            'Настя',
            'Марго',
            'Артем',
            'Валера',
            'Володя',
            'Вова',
            'Даня',
            'Аркадий',
            'Низами',
            'Алла',
            'Светлана',
            'Александр',
            'Надежда',
            'Полина',
        ] //20

        const Phones = [
            '+7 (942) 342-34-25',
            '+7 (381) 126-78-91',
            '+7 (763) 458-92-37',
            '+7 (290) 587-46-13',
            '+7 (813) 940-03-28',
            '+7 (657) 214-66-05',
            '+7 (325) 899-81-70',
            '+7 (498) 234-62-88',
            '+7 (712) 690-39-41',
            '+7 (865) 370-15-92',
            '+7 (103) 740-54-07',
            '+7 (902) 864-48-36',
            '+7 (645) 311-94-60',
            '+7 (713) 708-20-01',
            '+7 (884) 162-73-58',
            '+7 (537) 900-27-49',
            '+7 (329) 281-37-90',
            '+7 (472) 519-82-65',
            '+7 (204) 350-76-24',
            '+7 (616) 438-29-18',
          ] //20

          const Deliveries = [
            'self',
            'delivery'
          ] //2

          const Addresses = [
            'ул. Ленина, д. 12',
            'пр. Невский, д. 45',
            'ул. Мира, д. 7',
            'ул. Баумана, д. 23',
            'ул. Красный проспект, д. 18',
            'ул. Советская, д. 5',
            'пр. Ленина, д. 81',
            'ул. Масленникова, д. 36',
            'ул. Труда, д. 99',
            'ул. Станиславского, д. 10',
            'ул. Октября, д. 58',
            'ул. Победы, д. 14',
            'ул. Гагарина, д. 72',
            'пр. Космонавтов, д. 33',
            'ул. Центральная, д. 6',
            'ул. Молодёжная, д. 27',
            'ул. Рабочая, д. 88',
            'ул. Школьная, д. 19',
            'ул. Луговая, д. 54',
            'ул. Садовая, д. 3',
          ] //20

          //products - 42, 77

        try {
            const date = new Date();

            for (let index = 0; index < 10 * 30 * 12 * 2; index++) {
                console.log(index)
                date.setUTCHours(date.getUTCHours() + 3);
                const datePart = date.toISOString().slice(0, 10);
                const timePart = date.toISOString().slice(11, 16);

                let cart = [];

                for (let i = 0; i < OrderController.getRandomInt(1, 10); i++) {
                    let item = {};
                    item.id = OrderController.getRandomInt(42, 77);
                    item.price = (await DBService.getProduct(item.id)).data.price
                    item.count = OrderController.getRandomInt(1, 5);

                    cart.push(item);
                }

                let new_order = {}
                new_order.cart = cart;
                new_order.name = Names[OrderController.getRandomInt(0, 19)];
                new_order.phone = Phones[OrderController.getRandomInt(0, 19)];
                new_order.delivery = Deliveries[OrderController.getRandomInt(0, 1)];
                new_order.address = Addresses[OrderController.getRandomInt(0, 19)];
                new_order.flat = OrderController.getRandomInt(0, 100);
                new_order.comment = '';
                new_order.tools = String(OrderController.getRandomInt(0, 8));
                new_order.date = datePart;
                new_order.time = timePart;

                await OrderController.addOrderFill(new_order);
            }

            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}