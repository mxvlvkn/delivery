import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'
import DBService from '../services/DBService.js';

export default class ProductController {
    constructor() {
        // this.parseFormData = this.parseFormData.bind(this);
    }

    static async addCategory(req, res, next) {
        try {
            const VALUES = req.body;

            const ValidData = ValidationService.addCategory(VALUES);
            if (!ValidData.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }
            
            const DBDataRes = (await DBService.addCategory(VALUES));
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async getCategories(req, res, next) {
        try { 
            const DBDataRes = (await DBService.getCategories());

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
    static async deleteCategory(req, res, next) {
        try { 
            const ID = req.body.id;

            const DBDataRes = (await DBService.deleteCategory(ID));

            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {
                data: {},
                message: 'OK'
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async setCategory(req, res, next) {
        try {
            const VALUES = req.body;

            const ValidData = ValidationService.setCategory(VALUES);
            if (!ValidData.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            const DBDataRes = (await DBService.setCategoryByID(VALUES.id, VALUES));
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async getCategory(req, res, next) {
        try { 
            const ID = req.body.ID;

            const DBDataRes = (await DBService.getCategory(ID));

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
    static async addProductToCategory(req, res, next) {
        try {
            const VALUES = req.body;
            
            const DBDataRes = (await DBService.addProductToCategory(VALUES));
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async deleteProductFromCategory(req, res, next) {
        try { 
            const VALUES = req.body;

            const DBDataRes = (await DBService.deleteProductFromCategory(VALUES));

            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            ResService.create(res, 200, {
                data: {},
                message: 'OK'
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async getMenu(req, res, next) {
        try { 
            const DBDataRes = (await DBService.getMenu());

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
}