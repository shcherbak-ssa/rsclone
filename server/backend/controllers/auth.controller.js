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
exports.AuthController = void 0;
const registration_model_1 = require("../models/registration.model");
const auth_validation_1 = require("../validation/auth.validation");
const constants_1 = require("../../common/constants");
const login_model_1 = require("../models/login.model");
const unique_model_1 = require("../models/unique.model");
class AuthController {
    constructor() {
        this.uniqueModel = new unique_model_1.UniqueModel();
        this.registrationModel = new registration_model_1.RegistrationModel();
        this.loginModel = new login_model_1.LoginModel();
        this.validation = new auth_validation_1.AuthValidationImpl();
    }
    createNewUser({ body: user, responseSender }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validation.validateRegistrationData(user);
                yield this.uniqueModel.checkExistingUserWithCurrentEmail(user.email);
                const accessUser = yield this.registrationModel.createUser(user);
                yield responseSender.sendSuccessJsonResponse(accessUser, constants_1.StatusCodes.CREATED);
            }
            catch (error) {
                yield responseSender.sendErrorResponse(error);
            }
        });
    }
    loginUser({ body: user, responseSender }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validation.validateLoginData(user);
                const accessUser = yield this.loginModel.loginUser(user);
                yield responseSender.sendSuccessJsonResponse(accessUser);
            }
            catch (error) {
                yield responseSender.sendErrorResponse(error);
            }
        });
    }
}
exports.AuthController = AuthController;
