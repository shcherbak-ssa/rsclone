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
exports.PagePathnameService = void 0;
const unique_model_1 = require("../models/unique.model");
const constants_1 = require("../constants");
const pathname_service_1 = require("./pathname.service");
class PagePathnameService {
    constructor() {
        this.uniqueModel = new unique_model_1.UniqueModel();
        this.pathnameService = new pathname_service_1.PathnameService();
    }
    createPagePathname(userID, spaceID, pageTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagePathname = this.createPagePathnameFromPageTitle(pageTitle);
            return yield this.getUniquePagePathname(userID, spaceID, pagePathname);
        });
    }
    createPagePathnameFromPageTitle(pageTitle) {
        return this.pathnameService
            .replaceSpaces(pageTitle)
            .replace(/[!@#$%^&*\(\)\[\]\{\}+=?\/<>]/g, constants_1.EMPTY_STRING);
    }
    getUniquePagePathname(userID, spaceID, pagePathname, count = constants_1.INITIAL_PATHNAME_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUnique = yield this.uniqueModel.isPagePathnameUnique(userID, spaceID, pagePathname);
            return isUnique
                ? pagePathname : yield this.generateSpacePathname(userID, spaceID, pagePathname, count);
        });
    }
    generateSpacePathname(userID, spaceID, pagePathname, count) {
        return __awaiter(this, void 0, void 0, function* () {
            pagePathname = this.pathnameService.appendCount(pagePathname, count);
            return yield this.getUniquePagePathname(userID, spaceID, pagePathname, count += 1);
        });
    }
}
exports.PagePathnameService = PagePathnameService;
