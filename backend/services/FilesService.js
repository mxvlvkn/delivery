import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

export default class FilesService {
    static saveImage(uploadPath, file) {
        try {
            return new Promise((resolve, reject) => {
                fs.rename(file.filepath, uploadPath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(uploadPath);
                    }
                });
            });
        } catch (err) {
            console.log('Save image error: ' + err);
            throw new Error(err);
        }
    }
    static deleteImage(filePath) {
        try {
            return new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('File deleted successfully');
                    }
                });
            });
        } catch (err) {
            console.log('Delete image error: ' + err);
            throw new Error(err);
        }
    }
    static getDirname() {
        return __dirname;
    }
}