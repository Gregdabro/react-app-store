module.exports = class ApiError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static unauthorizedError() {
        return new ApiError(401, "UNAUTHORIZED")
    }

    static badRequestError(message) {
        return new ApiError(400, message);
    }

    static internalError(message) {
        return new ApiError(500, "Ошибка сервера. Попробуйте позже.", message);
    }
}