export default class ExceptionHandler extends Error {
    status;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError() {
        return new ExceptionHandler(401, 'Пользователь не авторизован');
    }

    static BadRequest(message) {
        return new ExceptionHandler(400, message);
    }

    static InternalServerError() {
        return new ExceptionHandler(500, 'Внутренная ошибка сервера');
    }
}