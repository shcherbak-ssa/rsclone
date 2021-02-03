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
exports.SpacesCollectionDatabase = void 0;
const mongodb_1 = require("mongodb");
const database_db_service_1 = require("../services/database-db.service");
const constants_1 = require("../constants");
class SpacesCollectionDatabase {
    getUserSpacesCollection(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_db_service_1.DatabaseDBService.createDatabase(userID).createCollection(constants_1.CollectionNames.SPACES);
        });
    }
    getSpaceSearchFilter(spaceID) {
        return { _id: new mongodb_1.ObjectID(spaceID) };
    }
    getSpaces(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const result = yield userSpacesCollection.getDocuments();
            const spaces = yield result.toArray();
            spaces.forEach((space) => {
                space.id = space._id;
                delete space._id;
            });
            return spaces;
        });
    }
    createSpace(userID, createdSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const createdSpaceID = yield userSpacesCollection.createDocument(Object.assign({}, createdSpace));
            return Object.assign(Object.assign({}, createdSpace), { [constants_1.UserDataLabels.SPACE_LAST_UPDATED]: +new Date(), id: `${createdSpaceID}` });
        });
    }
    updateSpace(userID, { id, updates }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const updateSpaceFilter = this.getSpaceSearchFilter(id);
            const updatesOptions = {
                $set: Object.assign({}, updates),
            };
            yield userSpacesCollection.updateDocument(updateSpaceFilter, updatesOptions);
        });
    }
    deleteSpace(userID, deletedSpaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const deleteSpaceFilter = this.getSpaceSearchFilter(deletedSpaceID);
            yield userSpacesCollection.deleteDocument(deleteSpaceFilter);
        });
    }
    getSpaceID(userID, spacePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const getSpaceIDFilter = {
                [constants_1.UserDataLabels.SPACE_PATHNAME]: spacePathname,
            };
            const getSpaceIDOptions = {
                projection: {
                    _id: 1,
                },
            };
            const result = yield userSpacesCollection.getDocument(getSpaceIDFilter, getSpaceIDOptions);
            return `${result._id}`;
        });
    }
    getSpacePageIDs(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const getSpacePageIDsFilter = this.getSpaceSearchFilter(spaceID);
            const getSpacePageIDsOptions = {
                projection: {
                    [constants_1.UserDataLabels.SPACE_PAGES]: 1,
                },
            };
            const result = yield userSpacesCollection.getDocument(getSpacePageIDsFilter, getSpacePageIDsOptions);
            return result[constants_1.UserDataLabels.SPACE_PAGES];
        });
    }
    isSpacePathnameUnique(userID, spacePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSpacesCollection = yield this.getUserSpacesCollection(userID);
            const uniqueQuery = {
                [constants_1.UserDataLabels.SPACE_PATHNAME]: spacePathname,
            };
            return yield userSpacesCollection.isUnique(uniqueQuery);
        });
    }
}
exports.SpacesCollectionDatabase = SpacesCollectionDatabase;
