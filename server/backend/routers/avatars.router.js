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
exports.AvatarsRouter = void 0;
const express_1 = require("express");
const avatars_controller_1 = require("../controllers/avatars.controller");
const constants_1 = require("../../common/constants");
class AvatarsRouter {
    constructor() {
        this.router = express_1.Router();
        const avatarsController = new avatars_controller_1.AvatarsController();
        this.runAvatarsController = avatarsController.runController.bind(avatarsController);
    }
    initRouter() {
        return this.router
            .all(constants_1.RequestPathnames.AVATARS, this.routerHanlder.bind(this));
    }
    routerHanlder({ method, controllerData, avatarFile }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!controllerData)
                return;
            switch (method) {
                case constants_1.RequestMethods.GET:
                    yield this.runAvatarsController(avatars_controller_1.AvatarsControllerActions.GET_AVATAR, controllerData);
                    break;
                case constants_1.RequestMethods.POST:
                    yield this.runAvatarsController(avatars_controller_1.AvatarsControllerActions.CREATE_AVATAR, controllerData, avatarFile);
                    break;
                case constants_1.RequestMethods.PUT:
                    yield this.runAvatarsController(avatars_controller_1.AvatarsControllerActions.UPDATE_AVATAR, controllerData, avatarFile);
                    break;
                case constants_1.RequestMethods.DELETE:
                    yield this.runAvatarsController(avatars_controller_1.AvatarsControllerActions.DELETE_AVATAR, controllerData);
                    break;
            }
        });
    }
}
exports.AvatarsRouter = AvatarsRouter;
