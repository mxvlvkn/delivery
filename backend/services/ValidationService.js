export default class ValidationService {
    static login(values) {
        let maxErrorLen = 500;
        let errorMessage = '';

        if (!values.login) {
            const message = 'Логин пустой, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!values.password) {
            const message = 'Пароль пустой, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
    static  addProduct(values, files) {
        let maxErrorLen = 500;
        let errorMessage = '';  

        if (!values.name.length) {
            const message = 'Наименование пустое, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length > 100) {
            const message = 'Наименование больше 100 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        let weightIsNumber = true; 
        if (typeof values.weight !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения веса, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (weightIsNumber) {
            if (values.weight <= 0) {
                const message = 'Вес должен быть больше нуля, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }
        
        let priceIsNumber = true;
        if (typeof values.price !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения цены, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (priceIsNumber) {
            if (values.price <= 0) {
                const message = 'Цена должена быть больше нуля, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }

        if (typeof values.isSale !== 'boolean') {
            const message = 'Ошибка определения существования скидки, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.isSale) {
            let SalePriceIsNumber = true;
            if (typeof values.salePrice !== 'number') {
                SalePriceIsNumber = false;
                const message = 'Ошибка определения скидочной цены, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }

            if (SalePriceIsNumber) {
                if (values.salePrice <= 0) {
                    const message = 'Скидочная цена должена быть больше нуля, ';
                    if (errorMessage.length + message.length < maxErrorLen) {
                        errorMessage += message;
                    }
                }
            }
        }

        if (values.desc.length > 300) {
            const message = 'Описание больше 300 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!("image" in files)) {
            const message = 'Изображение не загружено, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
    static  setProduct(values) {
        let maxErrorLen = 500;
        let errorMessage = '';  

        if (!values.name.length) {
            const message = 'Наименование пустое, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length > 100) {
            const message = 'Наименование больше 100 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        let weightIsNumber = true; 
        if (typeof values.weight !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения веса, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (weightIsNumber) {
            if (values.weight <= 0) {
                const message = 'Вес должен быть больше нуля, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }

        console.log(typeof values.price)
        
        let priceIsNumber = true;
        if (typeof values.price !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения цены, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (priceIsNumber) {
            if (values.price <= 0) {
                const message = 'Цена должена быть больше нуля, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }

        if (typeof values.isSale !== 'boolean') {
            const message = 'Ошибка определения существования скидки, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.isSale) {
            let SalePriceIsNumber = true;
            if (typeof values.salePrice !== 'number') {
                SalePriceIsNumber = false;
                const message = 'Ошибка определения скидочной цены, ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }

            if (SalePriceIsNumber) {
                if (values.salePrice <= 0) {
                    const message = 'Скидочная цена должена быть больше нуля, ';
                    if (errorMessage.length + message.length < maxErrorLen) {
                        errorMessage += message;
                    }
                }
            }
        }

        if (values.desc.length > 300) {
            const message = 'Описание больше 300 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
    static  addCategory(values) {
        let maxErrorLen = 500;
        let errorMessage = '';  

        if (!values.name.length) {
            const message = 'Наименование пустое, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length > 100) {
            const message = 'Наименование больше 100 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
    static  setCategory(values) {
        let maxErrorLen = 500;
        let errorMessage = '';  

        if (!values.name.length) {
            const message = 'Наименование пустое, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length > 100) {
            const message = 'Наименование больше 100 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
    static  addOrder(values) {
        let maxErrorLen = 500;
        let errorMessage = '';

        const DeliveryValues = ['delivery', 'self'];
        const ToolsValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

        if (!values.name.length) {
            const message = 'Имя пустое, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length < 2) {
            const message = 'Имя меньше 2 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.name.length > 20) {
            const message = 'Имя больше 20 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(values.phone)) {
            const message = 'Некорректный номер, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }
        
        if (!DeliveryValues.includes(values.delivery)) {
            const message = 'Ошибка определения способа доставки, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.address.length === 0) {
            const message = 'Адрес пустой, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.address.length > 400) {
            const message = 'Адрес больше 400 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.flat.length === 0) {
            const message = 'Квартира пустая, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.flat.length > 100) {
            const message = 'Квартира больше 100 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.comment.length > 400) {
            const message = 'Комментарий больше 400 символов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!ToolsValues.includes(values.tools)) {
            const message = 'Ошибка определения приборов, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (!Array.isArray(values.cart)) {
            const message = 'Ошибка получения корзины, ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (errorMessage.length) {
            errorMessage = (errorMessage.endsWith(', ') ? errorMessage.slice(0, -2) : errorMessage) + '.';
        }

        return {
            errorMessage,
            status: (errorMessage) ? false : true
        }
    }
}