import { ObjectID } from 'mongodb';

import { User } from '../types/user.types';
import { DatabaseNames, UserDataLabels, UsersDatabaseCollectionNames } from '../constants';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { CreateUserDatabase } from '../models/registration.model';
import { FoundLoginUser, LoginUserDatabase } from '../models/login.model';
import { GetUsernameDatabase } from '../models/auth-user.model';
import { GetUserDatabase } from '../models/users/get-user.model';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase implements
  GetUsernameDatabase, CreateUserDatabase, LoginUserDatabase, GetUserDatabase
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

  // implements GetUsernameDatabase
  async getUsername(userID: string): Promise<any> {
    const getUsernameQuery = {
      _id: new ObjectID(userID),
    };
    const getUsernameOptions = {
      projection: { [UserDataLabels.USERNAME]: 1 },
    };

    return await this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
  }

  // implements CreateUserDatabase
  async createUser(newUser: User): Promise<string> {
    return await this.databaseCollection.createDocument(newUser);
  }

  async isUsernameUnique(username: string): Promise<boolean> {
    return await this.databaseCollection.isUnique({username});
  }

  async isEmailUnique(email: string): Promise<boolean> {
    return await this.databaseCollection.isUnique({email});
  }

  // implements LoginUserDatabase
  async getUserForLogin(email: string): Promise<FoundLoginUser> {
    const getUsernameQuery = { email };
    const getUsernameOptions = {
      projection: {
        _id: 1,
        [UserDataLabels.USERNAME]: 1,
        [UserDataLabels.PASSWORD]: 1,
      },
    };

    return await this.databaseCollection.getDocument(getUsernameQuery, getUsernameOptions);
  }

  // implements GetUserDatabase
  async getUser(userID: string): Promise<User> {
    const getUserQuery = { _id: new ObjectID(userID) };
    const getUserOptions = {
      projection: { _id: 0, [UserDataLabels.PASSWORD]: 0 },
    };

    return await this.databaseCollection.getDocument(getUserQuery, getUserOptions);
  }
}
