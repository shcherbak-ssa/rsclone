import { ObjectID } from 'mongodb';

import { DatabaseNames, UsersDatabaseCollectionNames } from '../constants';
import { UserData } from '../data/user.data';
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
    const getUserQuery = { _id: new ObjectID(userID) };
    const foundUser = await this.collectionDatabase.getDocument(getUserQuery);

    if (foundUser) {
      foundUser.userID = userID;
      return UserData.create(foundUser);
    }
  }
}
