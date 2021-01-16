import { ObjectID } from 'mongodb';

import { UpdatedUserData, User } from '../types/user.types';
import { DatabaseNames, UserDataLabels, UsersDatabaseCollectionNames } from '../constants';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { CreateUserDatabase } from '../models/registration.model';
import { FoundLoginUser, LoginUserDatabase } from '../models/login.model';
import { GetUsernameDatabase } from '../models/auth-user.model';
import { UserDatabase } from '../models/user.model';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase implements
  GetUsernameDatabase,
  CreateUserDatabase,
  LoginUserDatabase,
  UserDatabase
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

  private getUserIDSearchObject(userID: string): {_id: ObjectID} {
    return { _id: new ObjectID(userID) };
  }

  // implements GetUsernameDatabase
  async getUsername(userID: string): Promise<any> {
    const getUsernameQuery = this.getUserIDSearchObject(userID);
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

  // implements UserDatabase
  async getUser(userID: string): Promise<User> {
    const getUserQuery = this.getUserIDSearchObject(userID);
    const getUserOptions = {
      projection: { _id: 0, [UserDataLabels.PASSWORD]: 0 },
    };

    return await this.databaseCollection.getDocument(getUserQuery, getUserOptions);
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<void> {
    const updateUserFilter = this.getUserIDSearchObject(userID);
    const updates = {
      $set: { ...updatedData },
    };

    await this.databaseCollection.updateDocument(updateUserFilter, updates);
  }

  async deleteUser(userID: string): Promise<void> {
    const deleteUserFilter = this.getUserIDSearchObject(userID);
    await this.databaseCollection.deleteDocument(deleteUserFilter);
  }
}
