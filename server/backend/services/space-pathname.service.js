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
exports.SpacePathnameService = void 0;
const unique_model_1 = require("../models/unique.model");
const constants_1 = require("../constants");
const pathname_service_1 = require("./pathname.service");
class SpacePathnameService {
    constructor() {
        this.uniqueModel = new unique_model_1.UniqueModel();
        this.pathnameService = new pathname_service_1.PathnameService();
    }
    createSpacePathname(userID, spaceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const spacePathname = this.createSpacePathnameFromSpaceName(spaceName);
            return yield this.getUniqueSpacePathname(userID, spacePathname);
        });
    }
    createSpacePathnameFromSpaceName(spaceName) {
        return this.pathnameService.replaceSpaces(spaceName);
    }
    getUniqueSpacePathname(userID, spacePathname, count = constants_1.INITIAL_PATHNAME_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUnique = yield this.uniqueModel.isSpacePathnameUnique(userID, spacePathname);
            return isUnique
                ? spacePathname : yield this.generateSpacePathname(userID, spacePathname, count);
        });
    }
    generateSpacePathname(userID, spacePathname, count) {
        return __awaiter(this, void 0, void 0, function* () {
            spacePathname = this.pathnameService.appendCount(spacePathname, count);
            return yield this.getUniqueSpacePathname(userID, spacePathname, count += 1);
        });
    }
}
exports.SpacePathnameService = SpacePathnameService;
