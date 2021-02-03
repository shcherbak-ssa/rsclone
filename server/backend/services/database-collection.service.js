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
exports.DatabaseCollectionService = void 0;
const UNIQUE_COUNT = 0;
const LIMIT_UNIQUE_COUNT = 1;
class DatabaseCollectionService {
    constructor(collection) {
        this.uniqueOptions = { limit: LIMIT_UNIQUE_COUNT };
        this.collection = collection;
    }
    static createCollection(collection) {
        return new DatabaseCollectionService(collection);
    }
    getDocument(query, findOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.findOne(query, findOptions);
        });
    }
    getDocuments(query = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.find(query, options);
        });
    }
    createDocument(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertDocumentResult = yield this.collection.insertOne(document);
            return insertDocumentResult.ops[0]._id;
        });
    }
    updateDocument(filter, updates, updateOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.updateOne(filter, updates, updateOptions);
        });
    }
    deleteDocument(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.deleteOne(filter);
        });
    }
    isUnique(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundDocuments = yield this.collection.find(query, this.uniqueOptions);
            const documentsCount = yield foundDocuments.count();
            return documentsCount === UNIQUE_COUNT;
        });
    }
}
exports.DatabaseCollectionService = DatabaseCollectionService;
