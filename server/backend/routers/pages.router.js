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
exports.PagesRouter = void 0;
const express_1 = require("express");
const constants_1 = require("../../common/constants");
const pages_controller_1 = require("../controllers/pages.controller");
class PagesRouter {
    constructor() {
        this.router = express_1.Router();
        const pagesController = new pages_controller_1.PagesController();
        this.runPagesController = pagesController.runController.bind(pagesController);
    }
    initRouter() {
        return this.router
            .all(constants_1.RequestPathnames.PAGES, this.routerHanlder.bind(this));
    }
    routerHanlder({ method, controllerData }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!controllerData)
                return;
            switch (method) {
                case constants_1.RequestMethods.GET:
                    yield this.runPagesController(pages_controller_1.PagesControllerActions.GET_PAGES, controllerData);
                    break;
                case constants_1.RequestMethods.POST:
                    yield this.runPagesController(pages_controller_1.PagesControllerActions.CREATE_PAGE, controllerData);
                    break;
                case constants_1.RequestMethods.PUT:
                    yield this.runPagesController(pages_controller_1.PagesControllerActions.UPDATE_PAGE, controllerData);
                    break;
                case constants_1.RequestMethods.DELETE:
                    yield this.runPagesController(pages_controller_1.PagesControllerActions.DELETE_PAGE, controllerData);
                    break;
            }
        });
    }
}
exports.PagesRouter = PagesRouter;
