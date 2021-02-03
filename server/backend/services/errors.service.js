"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ClientError = void 0;
const constants_1 = require("../../common/constants");
const response_service_1 = require("./response.service");
class CustomError {
    constructor(message, statusCode, body) {
        this.name = '';
        this.message = message;
        this.statusCode = statusCode;
        this.body = body;
        this.addErrorMessageToBody();
    }
    getResponse() {
        return new response_service_1.ResponseService(this.statusCode, this.body);
    }
    addErrorMessageToBody() {
        this.body.message = this.message;
    }
}
class ClientError extends CustomError {
    constructor(message, statusCode, body = {}) {
        super(message, statusCode, body);
        this.name = constants_1.ErrorNames.CLIENT_ERROR;
    }
}
exports.ClientError = ClientError;
class ServerError extends CustomError {
    constructor(message, body = {}) {
        super(message, constants_1.StatusCodes.INTERNAL_SERVER_ERROR, body);
        this.name = constants_1.ErrorNames.SERVER_ERROR;
    }
}
exports.ServerError = ServerError;
