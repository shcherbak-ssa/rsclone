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
exports.AuthUserModel = void 0;
const users_collection_database_1 = require("../database/users-collection.database");
const access_token_service_1 = require("../services/access-token.service");
const constants_1 = require("../../common/constants");
const errors_service_1 = require("../services/errors.service");
class AuthUserModel {
    constructor() {
        this.database = users_collection_database_1.usersCollectionDatabase;
    }
    isValidUser({ userID, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.database.getUsername(userID);
            if (foundUser === null) {
                throw new errors_service_1.ClientError(`User with username '@${username}' does not exist`, constants_1.StatusCodes.NOT_FOUND);
            }
            ;
            return foundUser.username === username;
        });
    }
    createAccessToken(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = new access_token_service_1.AccessTokenService();
            return yield accessToken.createToken({ userID });
        });
    }
}
exports.AuthUserModel = AuthUserModel;
