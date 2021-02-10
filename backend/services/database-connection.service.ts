import { MongoClient } from 'mongodb';
import { serverConfig } from '../config';

export let connectedMongoDatabase: MongoClient;

export class DatabaseConnectionService {
  static init(): DatabaseConnectionService {
    connectedMongoDatabase = new MongoClient(
      process.env.MONGODB_URL as string,
      serverConfig.mongodb.options
    );

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
