import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import FilesService from '../services/FilesService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'
import formidable from 'formidable';
import path from "path";
import DBService from '../services/DBService.js';

export default class ProductController {
    constructor() {
        this.parseFormData = this.parseFormData.bind(this);
    }

    static async parseFormData(req) {
        return new Promise((resolve, reject) => {
            const form = formidable({});
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err)
                } else {
                    resolve([fields, files])
                }
            });
        });
    };
    static async addProduct(req, res, next) {
        try {
            const __dirname = FilesService.getDirname();

            let values = {};
            let files = {};
            try {
                [values, files] = await ProductController.parseFormData(req);
            } catch (err) {
                console.log('FormData parse error ' + err);
                throw ExceptionHandler.InternalServerError();
            }

            // Переводим в нормальный обьект вместо {field: ["value"]}
            values = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value[0]])
            );
            values.weight = Number(values.weight);
            values.price = Number(values.price);
            values.salePrice = Number(values.salePrice);
            values.isSale = values.isSale === 'true';   

            const ValidData = ValidationService.addProduct(values, files);
            if (!ValidData.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            const FileExp = files.image[0].originalFilename.split('.')[files.image[0].originalFilename.split('.').length - 1];
            
            const DBDataRes = (await DBService.addProduct(values, '/uploads/product_', FileExp));
            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }
            const PRODUCT_ID = DBDataRes.data.id.rows[0].save_product;

            FilesService.saveImage(path.join(__dirname, "..", "uploads", `${'product_' + PRODUCT_ID}.${FileExp}`), files.image[0]);

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async getProducts(req, res, next) {
        try { 
            const DBDataRes = (await DBService.getProducts());

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
    static async deleteProduct(req, res, next) {
        try { 
            const ID = req.body.id;

            const DBDataRes = (await DBService.deleteProduct(ID));

            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            try {
                const __dirname = FilesService.getDirname();
                const FILE_EXP = DBDataRes.data.img.split('.')[DBDataRes.data.img.split('.').length - 1];
                FilesService.deleteImage(path.join(__dirname, "..", "uploads", `${'product_' + ID}.${FILE_EXP}`));
            } catch (error) {
                console.log('Delete img err: ' + err);
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
    static async setProduct(req, res, next) {
        try {
            const __dirname = FilesService.getDirname();

            let values = {};
            let files = {};
            try {
                [values, files] = await ProductController.parseFormData(req);
            } catch (err) {
                console.log('FormData parse error ' + err);
                throw ExceptionHandler.InternalServerError();
            }

            // Переводим в нормальный обьект вместо {field: ["value"]}
            values = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value[0]])
            );
            values.weight = Number(values.weight);
            values.price = Number(values.price);
            values.salePrice = Number(values.salePrice);
            values.isSale = values.isSale === 'true';   

            const ValidData = ValidationService.setProduct(values, files);
            if (!ValidData.status) {
                console.log('Invalid login data');
                throw ExceptionHandler.BadRequest(ValidData.errorMessage);
            }

            if ("image" in files) {
                const FileExp = files.image[0].originalFilename.split('.')[files.image[0].originalFilename.split('.').length - 1];

                const DBDataRes = (await DBService.setProductByID(values.id, values, `/uploads/product_${values.id}.${FileExp}`));
                if (!DBDataRes.status) {
                    console.log('Database error')
                    throw ExceptionHandler.InternalServerError();
                }

                FilesService.saveImage(path.join(__dirname, "..", "uploads", `${'product_' + values.id}.${FileExp}`), files.image[0]);
            } else {
                const DBDataRes = (await DBService.setProductByID(values.id, values));
                if (!DBDataRes.status) {
                    console.log('Database error')
                    throw ExceptionHandler.InternalServerError();
                }
            }

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async getProduct(req, res, next) {
        try { 
            const ID = req.body.ID;

            const DBDataRes = (await DBService.getProduct(ID));

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
    static async getPrices(req, res, next) {
        try { 
            const IDs = req.body;

            const DBDataRes = (await DBService.getPrices(IDs));

            if (!DBDataRes.status) {
                console.log('Database error')
                throw ExceptionHandler.InternalServerError();
            }

            console.log(DBDataRes.data)

            let prices = {};
            DBDataRes.data.forEach((item) => {
                prices[item.id] = item.is_sale ? item.sale_price : item.price;
            });

            ResService.create(res, 200, {
                data: prices,
                message: 'OK'
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}