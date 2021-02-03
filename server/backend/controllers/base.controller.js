"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const errors_service_1 = require("../services/errors.service");
class BaseController {
    unknowUserIDError() {
        return new errors_service_1.ServerError('Unknow user id', {
            error: 'Some problems with code',
        });
    }
}
exports.BaseController = BaseController;
