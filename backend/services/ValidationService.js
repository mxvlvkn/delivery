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
    static addProduct(values) {
        let maxErrorLen = 500;
        let errorMessage = '';

        if (!values.name.length) {
            const message = 'Наименование пустое. ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        let weightIsNumber = true; 
        if (typeof values.weight !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения веса. ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (weightIsNumber) {
            if (!values.weight <= 0) {
                const message = 'Вес должен быть больше нуля. ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }
        
        let priceIsNumber = true;
        if (typeof values.price !== 'number') {
            weightIsNumber = false;
            const message = 'Ошибка определения цены. ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (priceIsNumber) {
            if (!values.price <= 0) {
                const message = 'Цена должена быть больше нуля. ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }
        }

        if (typeof values.price !== 'boolean') {
            const message = 'Ошибка определения существования скидки. ';
            if (errorMessage.length + message.length < maxErrorLen) {
                errorMessage += message;
            }
        }

        if (values.isSale) {
            let SalePriceIsNumber = true;
            if (typeof values.salePrice !== 'number') {
                SalePriceIsNumber = false;
                const message = 'Ошибка определения скидочной цены. ';
                if (errorMessage.length + message.length < maxErrorLen) {
                    errorMessage += message;
                }
            }

            if (SalePriceIsNumber) {
                if (!values.salePrice <= 0) {
                    const message = 'Скидочная цена должена быть больше нуля. ';
                    if (errorMessage.length + message.length < maxErrorLen) {
                        errorMessage += message;
                    }
                }
            }
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
}