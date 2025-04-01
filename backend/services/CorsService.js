import cors from 'cors';
const siteHost = process.env.SITE_HOST;

export default class CorsService {
    static set(app) {
        try {
            app.use(cors(this.corsOptions));
            app.options('*', cors(this.corsOptions));
        } catch (err) {
            console.log('Set cors error: ' + err);
            throw new Error(err);
        }
    }

    static corsOptions = {
        "origin": siteHost,
        "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
        "credentials": true,
        "allowedHeaders": "Content-Type, Authorization",
    }
}