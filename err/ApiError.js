const messageUserNotAuth = 'Пользователь не авторизован'; 

class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message, messages = []) {
        return new ApiError(404, message, messages);
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static unauthorizedError() {
        return new ApiError(401, messageUserNotAuth);
    };
}

export default ApiError;