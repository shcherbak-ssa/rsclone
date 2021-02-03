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
exports.UsernameService = void 0;
const constants_1 = require("../constants");
const unique_model_1 = require("../models/unique.model");
class UsernameService {
    constructor() {
        this.uniqueModel = new unique_model_1.UniqueModel();
    }
    createUsername(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = this.createUsernameFromEmail(email);
            return yield this.getUniqueUsername(username, username[0]);
        });
    }
    createUsernameFromEmail(email) {
        return email.split('@')[0].replace(/\./g, constants_1.MINUS_REPLACE_STRING);
    }
    generateUsername(firstLetter) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = firstLetter + +new Date();
            return yield this.getUniqueUsername(username, firstLetter);
        });
    }
    getUniqueUsername(username, firstLetter) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUnique = yield this.uniqueModel.isUsernameUnique(username);
            return isUnique ? username : yield this.generateUsername(firstLetter);
        });
    }
}
exports.UsernameService = UsernameService;
