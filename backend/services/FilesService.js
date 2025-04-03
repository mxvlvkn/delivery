import cors from 'cors';
const siteHost = process.env.SITE_HOST;
import fs from "fs";

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
}