import FetchService from './FetchService.js';

export default class InterceptorService {
    static async authInterceptor(callback) {
        const data = await callback();
        console.log(data)
        if (!data.status) {
            return await FetchService.refresh().then(async data => {
                if (!data.status) {
                    return {...data, authErr: true};
                } else {
                    localStorage.setItem("accessToken", data.data.accessToken);
                    return {...(await callback()), authErr: false};
                }
            });
        }

        console.log(data)
        return {...data, authErr: false};
    }
}