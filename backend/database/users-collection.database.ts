import { ObjectID } from 'mongodb';

import { DatabaseNames, UsersDatabaseCollectionNames } from '../constants';
import { UserData } from '../data/user.data';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase {
  private databaseCollection: DatabaseCollectionService;
  
  constructor(databaseCollection: DatabaseCollectionService) {
    this.databaseCollection = databaseCollection;
  }

  static create() {
    const usersDatabase = DatabaseDBService.createDatabase(DatabaseNames.USERS);
    const collectionDatabase = usersDatabase.createCollection(UsersDatabaseCollectionNames.USERS);
    
    usersCollectionDatabase = new UsersCollectionDatabase(collectionDatabase);
  }

  async getUser(userID: string) {
    const getUserQuery = { _id: new ObjectID(userID) };
    const foundUser = await this.databaseCollection.getDocument(getUserQuery);

    if (foundUser) {
      foundUser.userID = userID;
      return UserData.create(foundUser);
    }
  }
}
