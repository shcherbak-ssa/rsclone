"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../common/constants");
const static_service_1 = require("./services/static.service");
class App {
    constructor({ port, routers, middlewares, appMiddlewares, }) {
        this.application = express_1.default();
        this.port = parseInt(port);
        this.initMiddlewares(middlewares);
        this.initAppMiddlewares(appMiddlewares);
        this.initPublic();
        this.initRouters(routers);
    }
    static init(appOptions) {
        return new App(appOptions);
    }
    listen() {
        this.application.listen(this.port, () => {
            console.log(`Server runs on port ${this.port}`);
        });
    }
    initMiddlewares(middlewares) {
        middlewares.forEach((middleware) => this.application.use(middleware));
    }
    initAppMiddlewares(appMiddlewares) {
        appMiddlewares.forEach((middleware) => {
            const { method, pathname, handler } = middleware;
            switch (method) {
                case constants_1.RequestMethods.GET:
                    this.application.get(pathname, handler.bind(middleware));
                    break;
                default:
                    this.application.use(pathname, handler.bind(middleware));
            }
        });
    }
    initRouters(routers) {
        routers.forEach((router) => this.application.use(router.initRouter()));
    }
    initPublic() {
        this.application.use(express_1.default.static(static_service_1.StaticService.publicPath));
    }
}
exports.App = App;
;
