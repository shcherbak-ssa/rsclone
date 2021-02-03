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
exports.EntryMiddleware = void 0;
const constants_1 = require("../../common/constants");
const constants_2 = require("../../common/constants");
const errors_service_1 = require("../services/errors.service");
const static_service_1 = require("../services/static.service");
const response_sender_service_1 = require("../services/response-sender.service");
class EntryMiddleware {
    constructor() {
        this.pathname = constants_2.MiddlewarePathnames.ENTRY;
        this.method = constants_1.RequestMethods.GET;
        this.staticService = new static_service_1.StaticService();
        this.responseSender = new response_sender_service_1.ResponseSenderService();
    }
    handler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isEntryRequest(request)) {
                return next();
            }
            this.responseSender.setResponseObject(response);
            this.sendEntryFile();
        });
    }
    isEntryRequest(request) {
        if (this.isRequestFromCode(request)) {
            return false;
        }
        if (this.staticService.isAssetsRequest(request)) {
            return false;
        }
        return true;
    }
    isRequestFromCode(request) {
        return !!request.headers[constants_1.RequestHeaders.REQUEST_FROM_CODE];
    }
    sendEntryFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entryFilePath = this.staticService.getEntryFilePath();
                this.responseSender.sendFile(constants_1.StatusCodes.SUCCESS, entryFilePath);
            }
            catch (error) {
                const serverError = new errors_service_1.ServerError(error.message, {});
                const responseService = serverError.getResponse();
                this.responseSender.endRequest(responseService.getStatusCode(), responseService.getBody());
            }
        });
    }
}
exports.EntryMiddleware = EntryMiddleware;
