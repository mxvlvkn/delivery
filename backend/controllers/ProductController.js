import {} from 'dotenv/config'
import bcrypt from 'bcrypt';
import ValidationService from '../services/ValidationService.js';
import ResService from '../services/ResService.js';
import BDService from '../services/BDService.js';
import TokenService from '../services/TokenService.js';
import ExceptionHandler from '../exceptions/ExceptionHandler.js'
const passSalt = process.env.passSalt;
import formidable from 'formidable';


export default class ProductController {
    constructor() {
        //this.sendEmailCode = this.sendEmailCode.bind(this);
    }
    static async createPost(req, res, next) {
        try {
            let values;
            let files;
            try {
                const form = formidable({});
                let [values, files] = await form.parse(req);
                console.log(values)
                console.log(files)
            } catch (err) {
                console.log('FormData parse error ' + err);
                throw ExceptionHandler.InternalServerError();
            }

            // validation

            

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async createPost(req, res, next) {
        try {
            let values;
            let files;
            try {
                const form = formidable({});
                let [values, files] = await form.parse(req);
                console.log(values)
                console.log(files)
            } catch (err) {
                console.log('FormData parse error ' + err);
                throw ExceptionHandler.InternalServerError();
            }

            // validation

            

            ResService.create(res, 200, {message: 'OK'});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}