"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
class ResponseService {
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body;
    }
    getStatusCode() {
        return this.statusCode;
    }
    getBody() {
        return this.body;
    }
}
exports.ResponseService = ResponseService;
