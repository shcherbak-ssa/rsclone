import { GetUser, User } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UpdatedUserData } from '../types/user.types';
import { EMPTY_VALUE_LENGTH } from '../../src/constants';
import { UniqueControllerModel } from './unique-controller.model';
import { UserDataLabels } from '../constants';

export interface UserDatabase {
  getUser(userID: string): Promise<User>;
  updateUser(userID: string, updatedData: UpdatedUserData): Promise<void>;
  deleteUser(userID: string): Promise<void>;
}

export class UserModel {
  private database: UserDatabase;
  private uniqueControllerModel: UniqueControllerModel;
  
  constructor() {
    this.database = usersCollectionDatabase;
    this.uniqueControllerModel = new UniqueControllerModel();
  }

  async getUser(userID: string): Promise<GetUser> {
    const user: User = await this.database.getUser(userID);
    // @TODO: add request spaces
    return {user, spaces: []};
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<any> {
    if (Object.keys(updatedData).length === EMPTY_VALUE_LENGTH) return {};

    if (UserDataLabels.EMAIL in updatedData) {
      const email: string = updatedData[UserDataLabels.EMAIL];
      await this.uniqueControllerModel.checkExistingUserWithCurrentEmail(email);
    }

    if (UserDataLabels.USERNAME in updatedData) {
      const username: string = updatedData[UserDataLabels.USERNAME];
      await this.uniqueControllerModel.checkExistingUserWithCurrentUsername(username);
    }

    await this.database.updateUser(userID, updatedData);
    return {...updatedData};
  }

  async deleteUser(userID: string): Promise<any> {
    await this.database.deleteUser(userID);
    return { deleted: true };
  }
}
