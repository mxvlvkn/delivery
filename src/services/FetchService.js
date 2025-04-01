import axios from 'axios';
const serverHost = process.env.REACT_APP_SERVER_HOST;

export default class FetchService {
    constructor() {
        this.send = this.send.bind(this);
      }

    static async send(url, dataToSend) {
        return axios.post(url, JSON.stringify(dataToSend), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return {
                status: (response.status === 200) ? true : false,
                msg: response.data.msg || "",
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
            if ('status' in ResData) {
                return {
                    status: (error.response.status == 200) ? true : false,
                    msg: ResData.msg || "",
                    data: ResData.data || []
                }
            }

            console.log('Fetch service: ' + error)
            return {
                status: false,
                msg: 'Непредвиденная ошибка',
                data: null
            }
        });
    }

    static async login(dataToSend) {
        return await this.send(
            `${serverHost}/auth/login`,
            dataToSend
        );
    }
    static async checkAuth() {
        return await this.send(
            `${serverHost}/auth/check`,
            {}
        );
    }
    static async createPost(data) {
        return await fetch(`${serverHost}/create_post`, {
            method: 'POST', 
            body: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            return {
                status: (status == 200) ? true : false,
                data
            }
        })
        .catch(() => {
            return {
                status: false,
                data: null
            }
        });
    }
}