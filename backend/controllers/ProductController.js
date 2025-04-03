import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import FilesService from '../services/FilesService.js';
import BDService from '../services/BDService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'
import formidable from 'formidable';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

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
            FilesService.saveImage(path.join(__dirname, "..", "uploads", `{${values.name.replaceAll(" ", "_")}.${FileExp}}`), files.image[0]);

            // Сохранить данные в бд

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}