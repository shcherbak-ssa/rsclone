import { ObjectID } from 'mongodb';

import { UpdatedUserData, User } from '../types/user.types';
import { DatabaseNames, UserDataLabels, CollectionNames } from '../constants';
import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { CreateUserDatabase } from '../models/registration.model';
import { FoundLoginUser, LoginUserDatabase } from '../models/login.model';
import { GetUsernameDatabase } from '../models/auth-user.model';
import { UsersDatabase } from '../models/users.model';
import { UniqueUserDatabase } from '../models/unique.model';
import { KeyboardShortcut } from '../../common/entities';
import { AvatarsDatabase } from '../models/avatars.model';

export let usersCollectionDatabase: UsersCollectionDatabase;

export class UsersCollectionDatabase implements
  GetUsernameDatabase,
  CreateUserDatabase,
  UniqueUserDatabase,
  LoginUserDatabase,
  UsersDatabase,
  AvatarsDatabase
{
  private databaseCollection: DatabaseCollectionService;
  
  constructor(databaseCollection: DatabaseCollectionService) {
    this.databaseCollection = databaseCollection;
  }

  static create() {
    const usersDatabase = DatabaseDBService.createDatabase(DatabaseNames.USERS);
    const collectionDatabase = usersDatabase.createCollection(CollectionNames.USERS);
    
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

  // implements UniqueControllerDatabase
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

  async getKeyboardShortcuts(userID: string): Promise<KeyboardShortcut[]> {
    const getKeyboardShortcutsQuery = this.getUserIDSearchObject(userID);
    const getKeyboardShortcutsOptions = {
      projection: {
        [UserDataLabels.SHORTCUTS]: 1,
      },
    };

    const result: any = await this.databaseCollection.getDocument(
      getKeyboardShortcutsQuery,
      getKeyboardShortcutsOptions
    );

    return result[UserDataLabels.SHORTCUTS];
  }

  async isCorrectPassword(userID: string, password: string): Promise<boolean> {
    const getPasswordQuery = this.getUserIDSearchObject(userID);
    const getPasswordOptions = {
      projection: {
        [UserDataLabels.PASSWORD]: 1,
      },
    };

    const result: any = await this.databaseCollection.getDocument(
      getPasswordQuery,
      getPasswordOptions,
    );

    return password === result.password;
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

  // implements AvatarsDatabase
  async getAvatarFileType(userID: string): Promise<string> {
    const getAvatarQuery = this.getUserIDSearchObject(userID);
    const getAvatarOptions = {
      projection: {
        [UserDataLabels.AVATAR]: 1,
      },
    };

    const result: any = await this.databaseCollection.getDocument(
      getAvatarQuery,
      getAvatarOptions,
    );

    return result.avatar;
  }
}
