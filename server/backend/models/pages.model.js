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
exports.PagesModel = void 0;
const pages_collection_database_1 = require("../database/pages-collection.database");
class PagesModel {
    constructor() {
        this.database = new pages_collection_database_1.PagesCollectionDatabase();
    }
    getPages(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getPages(userID, spaceID);
        });
    }
    createPage(pageAccess, newPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageID = yield this.database.createPage(pageAccess, newPage);
            return Object.assign(Object.assign({}, newPage), { id: `${pageID}` });
        });
    }
    updatePage(pageAccess, updatedPage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.updatePage(pageAccess, updatedPage);
        });
    }
    deletePage(pageAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.deletePage(pageAccess);
        });
    }
}
exports.PagesModel = PagesModel;
