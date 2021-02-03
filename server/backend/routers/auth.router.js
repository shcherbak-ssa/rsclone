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
exports.AuthRouter = void 0;
const express_1 = require("express");
const constants_1 = require("../../common/constants");
const auth_controller_1 = require("../controllers/auth.controller");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.authController = new auth_controller_1.AuthController();
    }
    initRouter() {
        return this.router
            .post(constants_1.RequestPathnames.REGISTRATION, this.registrationHandler.bind(this))
            .post(constants_1.RequestPathnames.LOGIN, this.loginHandler.bind(this));
    }
    loginHandler({ controllerData }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (controllerData) {
                yield this.authController.loginUser(controllerData);
            }
        });
    }
    registrationHandler({ controllerData }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (controllerData) {
                yield this.authController.createNewUser(controllerData);
            }
        });
    }
}
exports.AuthRouter = AuthRouter;
