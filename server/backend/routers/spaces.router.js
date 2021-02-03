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
exports.SpacesRouter = void 0;
const express_1 = require("express");
const constants_1 = require("../../common/constants");
const spaces_controller_1 = require("../controllers/spaces.controller");
class SpacesRouter {
    constructor() {
        this.router = express_1.Router();
        const spacesController = new spaces_controller_1.SpacesController();
        this.runSpacesController = spacesController.runController.bind(spacesController);
    }
    initRouter() {
        return this.router
            .all(constants_1.RequestPathnames.SPACES, this.routerHanlder.bind(this));
    }
    routerHanlder({ method, controllerData }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!controllerData)
                return;
            switch (method) {
                case constants_1.RequestMethods.POST:
                    yield this.runSpacesController(spaces_controller_1.SpacesControllerActions.CREATE_SPACE, controllerData);
                    break;
                case constants_1.RequestMethods.PUT:
                    yield this.runSpacesController(spaces_controller_1.SpacesControllerActions.UPDATE_SPACE, controllerData);
                    break;
                case constants_1.RequestMethods.DELETE:
                    yield this.runSpacesController(spaces_controller_1.SpacesControllerActions.DELETE_SPACE, controllerData);
                    break;
            }
        });
    }
}
exports.SpacesRouter = SpacesRouter;
