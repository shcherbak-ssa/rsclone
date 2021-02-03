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
exports.AvatarsModel = void 0;
const avatars_service_1 = require("../services/avatars.service");
const errors_service_1 = require("../services/errors.service");
const constants_1 = require("../../common/constants");
const users_collection_database_1 = require("../database/users-collection.database");
class AvatarsModel {
    constructor() {
        this.avatars = new avatars_service_1.AvatarsService();
        this.database = users_collection_database_1.usersCollectionDatabase;
    }
    getAvatar(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAvatarFileType = yield this.database.getAvatarFileType(userID);
            const userAvatarFilename = yield this.avatars.get(userID, userAvatarFileType);
            if (userAvatarFilename === null) {
                throw new errors_service_1.ClientError('Avatar not found', constants_1.StatusCodes.NOT_FOUND);
            }
            return userAvatarFilename;
        });
    }
    createAvatar(userID, avatarFile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.avatars.create(userID, avatarFile);
            return avatarFile.type;
        });
    }
    updatedAvatar(userID, avatarFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentFileType = yield this.database.getAvatarFileType(userID);
            yield this.avatars.update(userID, currentFileType, avatarFile);
            return avatarFile.type;
        });
    }
    deleteAvatar(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentFileType = yield this.database.getAvatarFileType(userID);
            yield this.avatars.delete(userID, currentFileType);
        });
    }
}
exports.AvatarsModel = AvatarsModel;
