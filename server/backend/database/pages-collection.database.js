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
exports.PagesCollectionDatabase = void 0;
const mongodb_1 = require("mongodb");
const database_db_service_1 = require("../services/database-db.service");
const constants_1 = require("../constants");
class PagesCollectionDatabase {
    getUserPagesCollection(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_db_service_1.DatabaseDBService.createDatabase(userID).createCollection(spaceID);
        });
    }
    getPageSearchFilter(pageID) {
        return { _id: new mongodb_1.ObjectID(pageID) };
    }
    getPages(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPagesCollection = yield this.getUserPagesCollection(userID, spaceID);
            const result = yield userPagesCollection.getDocuments();
            const pages = yield result.toArray();
            pages.forEach((page) => {
                page.id = page._id;
                delete page._id;
            });
            return pages;
        });
    }
    createPage({ userID, spaceID }, newPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPagesCollection = yield this.getUserPagesCollection(userID, spaceID);
            return yield userPagesCollection.createDocument(Object.assign({}, newPage));
        });
    }
    updatePage({ userID, spaceID, pageID }, { updates }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPagesCollection = yield this.getUserPagesCollection(userID, spaceID);
            const updatePageFilter = this.getPageSearchFilter(pageID);
            const updatesOptions = {
                $set: Object.assign({}, updates),
            };
            yield userPagesCollection.updateDocument(updatePageFilter, updatesOptions);
        });
    }
    deletePage({ userID, spaceID, pageID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPagesCollection = yield this.getUserPagesCollection(userID, spaceID);
            const deletePageFilter = this.getPageSearchFilter(pageID);
            yield userPagesCollection.deleteDocument(deletePageFilter);
        });
    }
    isPagePathnameUnique(userID, spaceID, pagePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPagesCollection = yield this.getUserPagesCollection(userID, spaceID);
            const uniqueQuery = {
                [constants_1.UserDataLabels.PAGE_PATHNAME]: pagePathname,
            };
            return yield userPagesCollection.isUnique(uniqueQuery);
        });
    }
}
exports.PagesCollectionDatabase = PagesCollectionDatabase;
