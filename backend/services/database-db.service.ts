import { Db } from 'mongodb';

import { DatabaseCollectionService } from './database-collection.service';
import { connectedMongoDatabase } from './database-connection.service';

export class DatabaseDBService {
  private database: Db;

  constructor(database: Db) {
    this.database = database;
  }

  static createDatabase(databaseName: string) {
    return new DatabaseDBService(connectedMongoDatabase.db(databaseName));
  }

  createCollection(collectionName: string) {
    const collection = this.database.collection(collectionName);
    return DatabaseCollectionService.createCollection(collection);
  }

  renameDatabase(newDatabaseName: string) {}
}
