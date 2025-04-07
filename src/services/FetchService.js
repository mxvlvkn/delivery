import axios from 'axios';
const serverHost = process.env.REACT_APP_SERVER_HOST;

export default class FetchService {
    constructor() {
        this.send = this.send.bind(this);
      }

    static async sendJSON(url, dataToSend = {}) {
        return axios.post(url, JSON.stringify(dataToSend), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return {
                status: (response.status === 200) ? true : false,
                msg: response.data.msg || response.data.message || "",
                data: response.data.data || []
            }
        })
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                return {
                    status: false,
                    msg: 'Ошибка соединения с сервером',
                    data: null
                }
            }
            
            const ResData = error.response.data;
            try {
                if ('status' in ResData) {
                    return {
                        status: (error.response.status == 200) ? true : false,
                        msg: ResData.msg || "",
                        data: ResData.data || []
                    }
                }  
            } catch {}
            

            console.log('Fetch service: ' + error)
            return {
                status: false,
                msg: 'Непредвиденная ошибка',
                data: null
            }
        });
    }

    static async sendFormData(url, dataToSend) {
        return axios.post(url, dataToSend, {
            withCredentials: true,
            headers: {}
        })
        .then(response => {
            return {
                status: (response.status === 200) ? true : false,
                msg: response.data.msg || response.data.message || "",
                data: response.data.data || []
            }
        })
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                return {
                    status: false,
                    msg: 'Ошибка соединения с сервером',
                    data: null
                }
            }
            
            const ResData = error.response.data;
            try {
                if ('status' in ResData) {
                    return {
                        status: (error.response.status == 200) ? true : false,
                        msg: ResData.msg || "",
                        data: ResData.data || []
                    }
                }
            } catch {}

            console.log('Fetch service: ' + error)
            return {
                status: false,
                msg: 'Непредвиденная ошибка',
                data: null
            }
        });
    }

    static async login(dataToSend) {
        return await this.sendJSON(
            `${serverHost}/auth/login`,
            dataToSend
        );
    }
    static async checkAuth() {
        return await this.sendJSON(
            `${serverHost}/auth/check`
        );
    }
    static async addProduct(dataToSend) {
        return await this.sendFormData(
            `${serverHost}/products/add`,
            dataToSend
        );
    }
    static async getProducts() {
        return await this.sendJSON(
            `${serverHost}/products/getAll`
        );
    }
    static async deleteProduct(dataToSend) {
        return await this.sendJSON(
            `${serverHost}/products/delete`,
            dataToSend
        );
    }
    static async getProduct(dataToSend) {
        return await this.sendJSON(
            `${serverHost}/products/get`,
            dataToSend
        );
    }
    static async setProduct(dataToSend) {
        return await this.sendFormData(
            `${serverHost}/products/set`,
            dataToSend
        );
    }
    static async deleteToken() {
        return await this.sendJSON(
            `${serverHost}/auth/logout`
        );
    }
}