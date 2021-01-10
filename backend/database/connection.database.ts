import { MongoClient } from 'mongodb';
import serverConfig from '../../config/server.config.json';
import { UsersCollectionDatabase } from './users-collection.database';

export let connectedMongoDatabase: MongoClient;

export class ConnectionDatabase {
  static init() {
    const {mongodb} = serverConfig;
    connectedMongoDatabase = new MongoClient(mongodb.url, mongodb.options);

    return new ConnectionDatabase();
  }

  async connect() {
    try {
      await connectedMongoDatabase.connect();
      console.log('Connected successfully to mongodb');
    } catch (error) {
      console.log(error);
      connectedMongoDatabase.close();
    } finally {
      return this;
    }
  }

  async createUsersCollection() {
    UsersCollectionDatabase.create();
  }
}
