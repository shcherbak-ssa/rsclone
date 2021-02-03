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
exports.ControllerMiddleware = void 0;
const constants_1 = require("../../common/constants");
const response_sender_service_1 = require("../services/response-sender.service");
class ControllerMiddleware {
    constructor() {
        this.pathname = constants_1.MiddlewarePathnames.CONTROLLER;
        this.method = null;
    }
    handler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerData = this.createControllerData(request, response);
            request.controllerData = controllerData;
            next();
        });
    }
    createControllerData(request, response) {
        const responseSender = this.createResponseSender(response);
        const userID = request.userID;
        if (request.method === constants_1.RequestMethods.GET) {
            return { userID, responseSender };
        }
        const body = this.getBody(request);
        return { body, userID, responseSender };
    }
    createResponseSender(response) {
        const responseSender = new response_sender_service_1.ResponseSenderService();
        responseSender.setResponseObject(response);
        return responseSender;
    }
    getBody(request) {
        return request.avatarFile ? request.avatarFile : request.body;
    }
}
exports.ControllerMiddleware = ControllerMiddleware;
