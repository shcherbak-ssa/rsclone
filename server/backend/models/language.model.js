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
exports.LanguageModel = void 0;
const static_service_1 = require("../services/static.service");
class LanguageModel {
    constructor() {
        this.staticService = new static_service_1.StaticService();
    }
    getLanguageParts(language, languageParts) {
        return __awaiter(this, void 0, void 0, function* () {
            const readLanguageParts = yield this.readLanguagePartFiles(language, languageParts);
            return yield this.transformToObject(readLanguageParts);
        });
    }
    readLanguagePartFiles(language, languageParts) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(languageParts.map((languagePart) => {
                return this.staticService.readLanguageFile(language, languagePart);
            }));
        });
    }
    transformToObject(readLanguageParts) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultObject = {};
            for (const [languagePart, content] of readLanguageParts) {
                resultObject[languagePart] = Object.assign({}, content);
            }
            return resultObject;
        });
    }
}
exports.LanguageModel = LanguageModel;
