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
exports.AvatarsService = void 0;
const path_1 = require("path");
const user_files_service_1 = require("./user-files.service");
const constants_1 = require("../../common/constants");
class AvatarsService {
    constructor() {
        this.usersFiles = new user_files_service_1.UserFilesService();
    }
    get(userID, fileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAvatarFilename = yield this.createUserAvatarFilename(userID, fileType);
            return this.usersFiles.fileIsExist(userAvatarFilename) ? userAvatarFilename : null;
        });
    }
    create(userID, { type, buffer }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAvatarFilename = yield this.createUserAvatarFilename(userID, type);
            yield this.usersFiles.writeUserFile(userAvatarFilename, buffer);
        });
    }
    update(userID, currentFileType, avatarFile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delete(userID, currentFileType);
            yield this.create(userID, avatarFile);
        });
    }
    delete(userID, fileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAvatarFilename = yield this.createUserAvatarFilename(userID, fileType);
            yield this.usersFiles.removeUserFile(userAvatarFilename);
        });
    }
    createUserAvatarFilename(userID, fileType) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFilesDirname = yield this.usersFiles.createUserFilesDirname(userID);
            return path_1.join(userFilesDirname, `${constants_1.AVATAR_LABEL}.${fileType}`);
        });
    }
}
exports.AvatarsService = AvatarsService;
