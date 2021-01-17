import { GetUser, User } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UpdatedUserData } from '../types/user.types';
import { EMPTY_VALUE_LENGTH } from '../../src/constants';

export interface UserDatabase {
  getUser(userID: string): Promise<User>;
  updateUser(userID: string, updatedData: UpdatedUserData): Promise<void>;
  deleteUser(userID: string): Promise<void>;
}

export class UserModel {
  private database: UserDatabase;
  
  constructor() {
    this.database = usersCollectionDatabase;
  }

  async getUser(userID: string): Promise<GetUser> {
    const user: User = await this.database.getUser(userID);
    // @TODO: add request spaces
    return {user, spaces: []};
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<any> {
    if (Object.keys(updatedData).length === EMPTY_VALUE_LENGTH) return {};

    await this.database.updateUser(userID, updatedData);
    return {};
  }

  async deleteUser(userID: string): Promise<any> {
    await this.database.deleteUser(userID);
    return { deleted: true };
  }
}
