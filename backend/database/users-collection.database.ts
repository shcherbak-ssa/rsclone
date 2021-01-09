import { ObjectID } from 'mongodb';
import { DatabaseNames, UsersDatabaseCollectionNames } from '../constants';
import { CollectionDatabase } from './collection.database';
import { DBDatabase } from './db.database';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase {
  private collectionDatabase: CollectionDatabase;
  
  constructor(collectionDatabase: CollectionDatabase) {
    this.collectionDatabase = collectionDatabase;
  }

  static create() {
    const usersDatabase = DBDatabase.createDatabase(DatabaseNames.USERS);
    const collectionDatabase = usersDatabase.createCollection(UsersDatabaseCollectionNames.USERS);
    
    usersCollectionDatabase = new UsersCollectionDatabase(collectionDatabase);
  }

  async getUser(userID: string) {
    return this.collectionDatabase.getDocument({ _id: new ObjectID(userID) });
  }

  async createUser(user: any) {
    return this.collectionDatabase.createDocument(user);
  }
}
