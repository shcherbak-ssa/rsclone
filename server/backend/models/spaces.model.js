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
exports.SpacesModel = void 0;
const spaces_collection_database_1 = require("../database/spaces-collection.database");
const database_db_service_1 = require("../services/database-db.service");
class SpacesModel {
    constructor() {
        this.database = new spaces_collection_database_1.SpacesCollectionDatabase();
    }
    getSpaces(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getSpaces(userID);
        });
    }
    createSpace(userID, createdSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.createSpace(userID, createdSpace);
        });
    }
    updateSpace(userID, updatedSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.updateSpace(userID, updatedSpace);
        });
    }
    deleteSpace(userID, deletedSpaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.deleteSpace(userID, deletedSpaceID);
            const userDatabase = database_db_service_1.DatabaseDBService.createDatabase(userID);
            yield userDatabase.deleteCollection(deletedSpaceID);
        });
    }
    getSpaceID(userID, spacePathname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getSpaceID(userID, spacePathname);
        });
    }
    getSpacePageIDs(userID, spaceID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.getSpacePageIDs(userID, spaceID);
        });
    }
}
exports.SpacesModel = SpacesModel;
