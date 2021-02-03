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
exports.UsersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const constants_1 = require("../../common/constants");
class UsersRouter {
    constructor() {
        this.router = express_1.Router();
        const usersController = new users_controller_1.UsersController();
        this.runUsersController = usersController.runController.bind(usersController);
    }
    initRouter() {
        return this.router
            .all(constants_1.RequestPathnames.USERS, this.routerHanlder.bind(this));
    }
    routerHanlder({ method, controllerData }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!controllerData)
                return;
            switch (method) {
                case constants_1.RequestMethods.GET:
                    return yield this.getUser(controllerData);
                case constants_1.RequestMethods.PUT:
                    return yield this.updateUser(controllerData);
                case constants_1.RequestMethods.DELETE:
                    return yield this.deleteUser(controllerData);
            }
        });
    }
    getUser(controllerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runUsersController(users_controller_1.UsersControllerActions.GET_USER, controllerData);
        });
    }
    updateUser(controllerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runUsersController(users_controller_1.UsersControllerActions.UPDATE_USER, controllerData);
        });
    }
    deleteUser(controllerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runUsersController(users_controller_1.UsersControllerActions.DELETE_USER, controllerData);
        });
    }
}
exports.UsersRouter = UsersRouter;
