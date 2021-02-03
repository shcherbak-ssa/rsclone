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
exports.UniqueModel = void 0;
const constants_1 = require("../constants");
const constants_2 = require("../../common/constants");
const validation_1 = require("../../common/validation");
const users_collection_database_1 = require("../database/users-collection.database");
const spaces_collection_database_1 = require("../database/spaces-collection.database");
const pages_collection_database_1 = require("../database/pages-collection.database");
class UniqueModel {
    constructor() {
        this.userDatabase = users_collection_database_1.usersCollectionDatabase;
        this.spaceDatabase = new spaces_collection_database_1.SpacesCollectionDatabase();
        this.pageDatabase = new pages_collection_database_1.PagesCollectionDatabase();
    }
    isUsernameUnique(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDatabase.isUsernameUnique(username);
        });
    }
    checkExistingUserWithCurrentUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUsernameUnique = yield this.userDatabase.isUsernameUnique(username);
            if (!isUsernameUnique) {
                throw new validation_1.ValidationError('User with current username is already exist', {
                    dataLabel: constants_1.UserDataLabels.USERNAME,
                    errorLabel: constants_2.ErrorLabels.USERNAME_EXIST,
                });
            }
        });
    }
    checkExistingUserWithCurrentEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmailUnique = yield this.userDatabase.isEmailUnique(email);
            if (!isEmailUnique) {
                throw new validation_1.ValidationError('User with current e-mail is already exist', {
                    dataLabel: constants_1.UserDataLabels.EMAIL,
                    errorLabel: constants_2.ErrorLabels.EMAIL_EXIST,
                });
            }
        });
    }
    isSpacePathnameUnique(userID, spacePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.spaceDatabase.isSpacePathnameUnique(userID, spacePathname);
        });
    }
    isPagePathnameUnique(userID, spaceID, pagePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pageDatabase.isPagePathnameUnique(userID, spaceID, pagePathname);
        });
    }
}
exports.UniqueModel = UniqueModel;
