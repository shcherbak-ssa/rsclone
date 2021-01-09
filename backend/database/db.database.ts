import { Db } from 'mongodb';

import { CollectionDatabase } from './collection.database';
import { connectedMongoDatabase } from './connection.database';

export class DBDatabase {
  private database: Db;

  constructor(database: Db) {
    this.database = database;
  }

  static createDatabase(databaseName: string) {
    return new DBDatabase(connectedMongoDatabase.db(databaseName));
  }

  createCollection(collectionName: string) {
    const collection = this.database.collection(collectionName);
    return CollectionDatabase.createCollection(collection);
  }

  renameDatabase(newDatabaseName: string) {}
}
