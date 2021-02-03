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
exports.UserFilesService = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const constants_1 = require("../constants");
class UserFilesService {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(UserFilesService.usersFilesDBDirname)) {
                yield fs_1.promises.mkdir(UserFilesService.usersFilesDBDirname);
            }
        });
    }
    static getFileType(mimetype) {
        return mimetype.split('/')[1];
    }
    fileIsExist(filename) {
        return fs_1.existsSync(filename);
    }
    createUserFilesDirname(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFilesDirname = path_1.join(UserFilesService.usersFilesDBDirname, userID);
            yield this.createUserFilesFolderIfDoesNotExist(userFilesDirname);
            return userFilesDirname;
        });
    }
    writeUserFile(userFileFilename, fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.writeFile(userFileFilename, fileBuffer);
        });
    }
    removeUserFile(userFileFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fileIsExist(userFileFilename)) {
                yield fs_1.promises.unlink(userFileFilename);
            }
        });
    }
    createUserFilesFolderIfDoesNotExist(userFilesDirname) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(userFilesDirname)) {
                yield fs_1.promises.mkdir(userFilesDirname);
            }
        });
    }
    deleteUserFilesFolder(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFilesDirname = yield this.createUserFilesDirname(userID);
            yield fs_1.promises.rmdir(userFilesDirname, { recursive: true });
        });
    }
}
exports.UserFilesService = UserFilesService;
UserFilesService.usersFilesDBDirname = path_1.join(process.cwd(), constants_1.USERS_FILES_DB_DIRNAME);
