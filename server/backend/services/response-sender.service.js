"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSenderService = void 0;
const errors_service_1 = require("./errors.service");
const constants_1 = require("../../common/constants");
const validation_1 = require("../../common/validation");
class ResponseSenderService {
    constructor() {
        this.response = null;
    }
    setResponseObject(response) {
        this.response = response;
    }
    sendSuccessJsonResponse(body, statusCode = constants_1.StatusCodes.SUCCESS) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sendJsonResponse(statusCode, body);
        });
    }
    sendErrorResponse(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${error.name}: ${error.message}`);
            if (error instanceof errors_service_1.ClientError || error instanceof errors_service_1.ServerError) {
                const responseService = error.getResponse();
                return this.sendJsonResponse(responseService.getStatusCode(), responseService.getBody());
            }
            if (error instanceof validation_1.ValidationError) {
                const payload = error.payload;
                return this.sendJsonResponse(constants_1.StatusCodes.BAD_REQUEST, payload);
            }
            console.log(error);
            const serverError = new errors_service_1.ServerError(error.message, {});
            const responseService = serverError.getResponse();
            this.sendJsonResponse(responseService.getStatusCode(), responseService.getBody());
        });
    }
    sendFile(statusCode, filePath) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.response) === null || _a === void 0 ? void 0 : _a.status(statusCode).sendFile(filePath);
        });
    }
    endRequest(statusCode, content) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.response) === null || _a === void 0 ? void 0 : _a.status(statusCode).end(content);
        });
    }
    sendJsonResponse(statusCode, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.response) === null || _a === void 0 ? void 0 : _a.status(statusCode).json(body);
        });
    }
}
exports.ResponseSenderService = ResponseSenderService;
