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
exports.ActiveSpaceMiddleware = void 0;
const response_sender_service_1 = require("../services/response-sender.service");
const constants_1 = require("../../common/constants");
const spaces_model_1 = require("../models/spaces.model");
class ActiveSpaceMiddleware {
    constructor() {
        this.pathname = constants_1.MiddlewarePathnames.ACTIVE_SPACE;
        this.method = null;
        this.spacesModel = new spaces_model_1.SpacesModel();
    }
    handler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerData = yield this.createControllerData(request, response);
            request.controllerData = controllerData;
            next();
        });
    }
    createControllerData(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseSender = this.createResponseSender(response);
            const userID = request.userID;
            const spaceID = yield this.getSpaceID(userID || '', request);
            const controllerData = {
                userID,
                spaceID,
                responseSender,
            };
            const { method } = request;
            return (method === constants_1.RequestMethods.GET)
                ? controllerData
                : Object.assign(Object.assign({}, controllerData), { body: request.body });
        });
    }
    createResponseSender(response) {
        const responseSender = new response_sender_service_1.ResponseSenderService();
        responseSender.setResponseObject(response);
        return responseSender;
    }
    getSpaceID(userID, { params: { spacePathname } }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.spacesModel.getSpaceID(userID, spacePathname);
        });
    }
}
exports.ActiveSpaceMiddleware = ActiveSpaceMiddleware;
