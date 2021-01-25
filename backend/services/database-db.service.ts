import { Db } from 'mongodb';

import { DatabaseCollectionService } from './database-collection.service';
import { connectedMongoDatabase } from './database-connection.service';
import { DeleteDatabase } from '../types/database.types';

export class DatabaseDBService implements DeleteDatabase {
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

  async delete(): Promise<void> {
    await this.database.dropDatabase();
  }

  async deleteCollection(collectionName: string): Promise<void> {
    await this.database.dropCollection(collectionName);
  }
}
