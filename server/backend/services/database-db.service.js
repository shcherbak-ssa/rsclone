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
exports.DatabaseDBService = void 0;
const database_collection_service_1 = require("./database-collection.service");
const database_connection_service_1 = require("./database-connection.service");
class DatabaseDBService {
    constructor(database) {
        this.database = database;
    }
    static createDatabase(databaseName) {
        return new DatabaseDBService(database_connection_service_1.connectedMongoDatabase.db(databaseName));
    }
    createCollection(collectionName) {
        const collection = this.database.collection(collectionName);
        return database_collection_service_1.DatabaseCollectionService.createCollection(collection);
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.dropDatabase();
        });
    }
    deleteCollection(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.dropCollection(collectionName);
        });
    }
}
exports.DatabaseDBService = DatabaseDBService;
