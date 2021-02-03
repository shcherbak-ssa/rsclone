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
exports.DatabaseConnectionService = exports.connectedMongoDatabase = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
class DatabaseConnectionService {
    static init() {
        exports.connectedMongoDatabase = new mongodb_1.MongoClient(process.env.MONGODB_URL, config_1.serverConfig.mongodb.options);
        return new DatabaseConnectionService();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield exports.connectedMongoDatabase.connect();
                console.log('Connected successfully to mongodb');
            }
            catch (error) {
                console.log(error);
                exports.connectedMongoDatabase.close();
            }
        });
    }
}
exports.DatabaseConnectionService = DatabaseConnectionService;
