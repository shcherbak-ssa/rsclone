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
exports.UsersCollectionDatabase = exports.usersCollectionDatabase = void 0;
const mongodb_1 = require("mongodb");
const constants_1 = require("../constants");
const database_db_service_1 = require("../services/database-db.service");
class UsersCollectionDatabase {
    constructor(databaseCollection) {
        this.databaseCollection = databaseCollection;
    }
    static create() {
        const usersDatabase = database_db_service_1.DatabaseDBService.createDatabase(constants_1.DatabaseNames.USERS);
        const collectionDatabase = usersDatabase.createCollection(constants_1.CollectionNames.USERS);
        exports.usersCollectionDatabase = new UsersCollectionDatabase(collectionDatabase);
    }
    getUserIDSearchObject(userID) {
        return { _id: new mongodb_1.ObjectID(userID) };
    }
    getUsername(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUsernameQuery = this.getUserIDSearchObject(userID);
            const getUsernameOptions = {
                projection: { [constants_1.UserDataLabels.USERNAME]: 1 },
            };
            return yield this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseCollection.createDocument(newUser);
        });
    }
    isUsernameUnique(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseCollection.isUnique({ username });
        });
    }
    isEmailUnique(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.databaseCollection.isUnique({ email });
        });
    }
    getUserForLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUsernameQuery = { email };
            const getUsernameOptions = {
                projection: {
                    _id: 1,
                    [constants_1.UserDataLabels.USERNAME]: 1,
                    [constants_1.UserDataLabels.PASSWORD]: 1,
                },
            };
            return yield this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
        });
    }
    getUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserQuery = this.getUserIDSearchObject(userID);
            const getUserOptions = {
                projection: { _id: 0, [constants_1.UserDataLabels.PASSWORD]: 0 },
            };
            return yield this.databaseCollection.getDocument(getUserQuery, getUserOptions);
        });
    }
    getKeyboardShortcuts(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const getKeyboardShortcutsQuery = this.getUserIDSearchObject(userID);
            const getKeyboardShortcutsOptions = {
                projection: {
                    [constants_1.UserDataLabels.SHORTCUTS]: 1,
                },
            };
            const result = yield this.databaseCollection.getDocument(getKeyboardShortcutsQuery, getKeyboardShortcutsOptions);
            return result[constants_1.UserDataLabels.SHORTCUTS];
        });
    }
    isCorrectPassword(userID, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPasswordQuery = this.getUserIDSearchObject(userID);
            const getPasswordOptions = {
                projection: {
                    [constants_1.UserDataLabels.PASSWORD]: 1,
                },
            };
            const result = yield this.databaseCollection.getDocument(getPasswordQuery, getPasswordOptions);
            return password === result.password;
        });
    }
    updateUser(userID, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserFilter = this.getUserIDSearchObject(userID);
            const updates = {
                $set: Object.assign({}, updatedData),
            };
            yield this.databaseCollection.updateDocument(updateUserFilter, updates);
        });
    }
    deleteUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUserFilter = this.getUserIDSearchObject(userID);
            yield this.databaseCollection.deleteDocument(deleteUserFilter);
        });
    }
    getAvatarFileType(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAvatarQuery = this.getUserIDSearchObject(userID);
            const getAvatarOptions = {
                projection: {
                    [constants_1.UserDataLabels.AVATAR]: 1,
                },
            };
            const result = yield this.databaseCollection.getDocument(getAvatarQuery, getAvatarOptions);
            return result.avatar;
        });
    }
    getUserLanguage(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserLanguageQuery = this.getUserIDSearchObject(userID);
            const getUserLanguageOptions = {
                projection: {
                    [constants_1.UserDataLabels.LANGUAGE]: 1,
                },
            };
            const findUser = yield this.databaseCollection.getDocument(getUserLanguageQuery, getUserLanguageOptions);
            return findUser[constants_1.UserDataLabels.LANGUAGE];
        });
    }
}
exports.UsersCollectionDatabase = UsersCollectionDatabase;
