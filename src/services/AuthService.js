import FetchService from './FetchService.js';

export default class AuthService {
    static async checkAuth() {
        const AuthData = await FetchService.checkAuth();

        return
    }
}