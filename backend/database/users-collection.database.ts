import { ObjectID } from 'mongodb';

import { GetUserDatabase, User } from '../types/user.types';
import { DatabaseNames, UserDataLabels, UsersDatabaseCollectionNames } from '../constants';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { CreateUserDatabase } from '../models/registration.model';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase implements GetUserDatabase, CreateUserDatabase {
  private databaseCollection: DatabaseCollectionService;
  
  constructor(databaseCollection: DatabaseCollectionService) {
    this.databaseCollection = databaseCollection;
  }

  static create() {
    const usersDatabase = DatabaseDBService.createDatabase(DatabaseNames.USERS);
    const collectionDatabase = usersDatabase.createCollection(UsersDatabaseCollectionNames.USERS);
    
    usersCollectionDatabase = new UsersCollectionDatabase(collectionDatabase);
  }

  async getUsername(userID: string): Promise<string> {
    const getUsernameQuery = {
      _id: new ObjectID(userID),
    };
    const getUsernameOptions = {
      projection: { [UserDataLabels.USERNAME]: 1 },
    };

    return await this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
  }

  async createUser(newUser: User): Promise<string> {
    return await this.databaseCollection.createDocument(newUser);
  }

  async isUsernameUnique(username: string): Promise<boolean> {
    return await this.databaseCollection.isUnique({username});
  }
}
