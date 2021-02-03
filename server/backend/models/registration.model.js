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
exports.RegistrationModel = void 0;
const users_collection_database_1 = require("../database/users-collection.database");
const auth_user_model_1 = require("./auth-user.model");
const default_data_1 = require("../data/default.data");
const username_service_1 = require("../services/username.service");
class RegistrationModel {
    constructor() {
        this.database = users_collection_database_1.usersCollectionDatabase;
        this.authUserModel = new auth_user_model_1.AuthUserModel();
        this.usernameService = new username_service_1.UsernameService();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.createNewUser(user);
            const userID = yield this.database.createUser(newUser);
            const token = yield this.authUserModel.createAccessToken(userID);
            return {
                username: newUser.username,
                token,
            };
        });
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = yield this.usernameService.createUsername(user.email);
            return Object.assign(Object.assign({ username }, user), default_data_1.defaultUserData);
        });
    }
}
exports.RegistrationModel = RegistrationModel;
