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
exports.LoginModel = void 0;
const errors_service_1 = require("../services/errors.service");
const constants_1 = require("../../common/constants");
const auth_user_model_1 = require("./auth-user.model");
const users_collection_database_1 = require("../database/users-collection.database");
class LoginModel {
    constructor() {
        this.database = users_collection_database_1.usersCollectionDatabase;
        this.authUserModel = new auth_user_model_1.AuthUserModel();
    }
    loginUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.database.getUserForLogin(user.email);
            if (foundUser === null)
                this.throwInvalidUserError();
            const isCorrectUser = this.isCorrectUser(user.password, foundUser.password);
            if (!isCorrectUser)
                this.throwInvalidUserError();
            const token = yield this.authUserModel.createAccessToken(foundUser._id);
            return {
                username: foundUser.username,
                token,
            };
        });
    }
    throwInvalidUserError() {
        throw new errors_service_1.ClientError('Invalid password or e-mail', constants_1.StatusCodes.NOT_FOUND, {
            isLoginError: true,
            error: constants_1.ErrorLabels.INVALID_USER,
        });
    }
    isCorrectUser(currentUserPassword, foundUserPassword) {
        return currentUserPassword === foundUserPassword;
    }
}
exports.LoginModel = LoginModel;
