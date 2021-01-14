import { MongoClient } from 'mongodb';
import serverConfig from '../../config/server.config.json';

export let connectedMongoDatabase: MongoClient;

export class DatabaseConnectionService {
  static init(): DatabaseConnectionService {
    const {mongodb} = serverConfig;
    connectedMongoDatabase = new MongoClient(mongodb.url, mongodb.options);

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
