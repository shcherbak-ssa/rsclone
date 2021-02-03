import { MongoClient } from 'mongodb';

import { serverConfig } from '../config';
import serverConfigJson from '../../config/server.config.json';

export let connectedMongoDatabase: MongoClient;

export class DatabaseConnectionService {
  static init(): DatabaseConnectionService {
    const {mongodb} = serverConfigJson;
    connectedMongoDatabase = new MongoClient(mongodb.url, serverConfig.mongodb.options);

    return new DatabaseConnectionService();
  }

  async connect(): Promise<void> {
    try {
      await connectedMongoDatabase.connect();
      console.log('Connected successfully to mongodb');
    } catch (error) {
      console.log(error);
      connectedMongoDatabase.close();
    }
  }
}
