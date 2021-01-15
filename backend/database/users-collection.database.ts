import { ObjectID } from 'mongodb';

import { GetUserDatabase, User } from '../types/user.types';
import { DatabaseNames, UserDataLabels, UsersDatabaseCollectionNames } from '../constants';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { CreateUserDatabase } from '../models/registration.model';
import { FoundLoginUser, LoginUserDatabase } from '../models/login.model';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase
  implements GetUserDatabase, CreateUserDatabase, LoginUserDatabase
{
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

  async isEmailUnique(email: string): Promise<boolean> {
    return await this.databaseCollection.isUnique({email});
  }

  async getUserForLogin(email: string): Promise<FoundLoginUser> {
    const getUsernameQuery = { email };
    const getUsernameOptions = {
      projection: {
        [UserDataLabels.FULLNAME]: 0,
        [UserDataLabels.EMAIL]: 0,
        [UserDataLabels.SHORTCUTS]: 0,
      },
    };

    return await this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
  }
}
