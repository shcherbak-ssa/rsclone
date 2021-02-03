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
exports.UsersModel = void 0;
const users_collection_database_1 = require("../database/users-collection.database");
const constants_1 = require("../constants");
const errors_service_1 = require("../services/errors.service");
const constants_2 = require("../../common/constants");
const user_files_service_1 = require("../services/user-files.service");
const database_db_service_1 = require("../services/database-db.service");
class UsersModel {
    constructor() {
        this.database = users_collection_database_1.usersCollectionDatabase;
        this.userFiles = new user_files_service_1.UserFilesService();
    }
    getUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getUser(userID);
        });
    }
    updateUser(userID, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatePassword(userID, updatedData);
            yield this.preparingKeyboardShorcutsForUpdating(userID, updatedData);
            yield this.database.updateUser(userID, updatedData);
            this.removePasswordFromUpdatedData(updatedData);
            return Object.assign({}, updatedData);
        });
    }
    deleteUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.deleteUser(userID);
                yield this.userFiles.deleteUserFilesFolder(userID);
                const userDatabase = database_db_service_1.DatabaseDBService.createDatabase(userID);
                yield userDatabase.delete();
                return { deleted: true };
            }
            catch (error) {
                throw new errors_service_1.ServerError(error.message, { deleted: false });
            }
        });
    }
    validatePassword(userID, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.UserDataLabels.PASSWORD in updatedData) {
                const password = updatedData[constants_1.UserDataLabels.PASSWORD];
                const newPassword = updatedData[constants_1.UserDataLabels.NEW_PASSWORD];
                const isCorrectPassword = yield this.database.isCorrectPassword(userID, password);
                if (isCorrectPassword) {
                    updatedData[constants_1.UserDataLabels.PASSWORD] = newPassword;
                    delete updatedData[constants_1.UserDataLabels.NEW_PASSWORD];
                }
                else {
                    throw new errors_service_1.ClientError('Invalid password', constants_2.StatusCodes.BAD_REQUEST, {
                        errorLabel: constants_2.ErrorLabels.INVALID_PASSWORD,
                        dataLabel: constants_1.UserDataLabels.PASSWORD
                    });
                }
            }
        });
    }
    preparingKeyboardShorcutsForUpdating(userID, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (constants_1.UserDataLabels.SHORTCUTS in updatedData) {
                const updatedKeyboardShortcuts = updatedData[constants_1.UserDataLabels.SHORTCUTS];
                const currentKeyboardShortcuts = yield this.database.getKeyboardShortcuts(userID);
                updatedData[constants_1.UserDataLabels.SHORTCUTS] = currentKeyboardShortcuts
                    .map((keyboardShortcut) => {
                    const updatedKeyboardShortcut = updatedKeyboardShortcuts
                        .find((updatedKeyboardShortcut) => {
                        return (updatedKeyboardShortcut.label === keyboardShortcut.label) || null;
                    });
                    return updatedKeyboardShortcut || keyboardShortcut;
                });
            }
        });
    }
    removePasswordFromUpdatedData(updatedData) {
        if (constants_1.UserDataLabels.PASSWORD in updatedData) {
            delete updatedData[constants_1.UserDataLabels.PASSWORD];
        }
    }
}
exports.UsersModel = UsersModel;
