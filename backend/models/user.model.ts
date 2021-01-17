import { GetUser, User } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UpdatedUserData } from '../types/user.types';
import { EMPTY_VALUE_LENGTH } from '../../src/constants';
import { UniqueControllerModel } from './unique-controller.model';
import { UserDataLabels } from '../constants';
import { KeyboardShortcut } from '../../common/entities';

export interface UserDatabase {
  getUser(userID: string): Promise<User>;
  getKeyboardShortcuts(userID: string): Promise<KeyboardShortcut[]>;
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

    await this.checkExistingUserWithCurrentEmail(updatedData);
    await this.checkExistingUserWithCurrentUsername(updatedData);
    await this.preparingKeyboardShorcutsForUpdating(userID, updatedData);

    await this.database.updateUser(userID, updatedData);
    return {...updatedData};
  }

  async deleteUser(userID: string): Promise<any> {
    await this.database.deleteUser(userID);
    return { deleted: true };
  }

  private async checkExistingUserWithCurrentEmail(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.EMAIL in updatedData) {
      const email = updatedData[UserDataLabels.EMAIL] as string;
      await this.uniqueControllerModel.checkExistingUserWithCurrentEmail(email);
    }
  }

  private async checkExistingUserWithCurrentUsername(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.USERNAME in updatedData) {
      const username = updatedData[UserDataLabels.USERNAME] as string;
      await this.uniqueControllerModel.checkExistingUserWithCurrentUsername(username);
    }
  }

  private async preparingKeyboardShorcutsForUpdating(
    userID: string, updatedData: UpdatedUserData
  ): Promise<void> {
    if (UserDataLabels.SHORTCUTS in updatedData) {
      const updatedKeyboardShortcuts
        = updatedData[UserDataLabels.SHORTCUTS] as KeyboardShortcut[];
      const currentKeyboardShortcuts: KeyboardShortcut[]
        = await this.database.getKeyboardShortcuts(userID);

      updatedData[UserDataLabels.SHORTCUTS] = currentKeyboardShortcuts
        .map((keyboardShortcut) => {
          const updatedKeyboardShortcut = updatedKeyboardShortcuts
            .find((updatedKeyboardShortcut) => {
              return (updatedKeyboardShortcut.label === keyboardShortcut.label) || null;
            });

          return updatedKeyboardShortcut || keyboardShortcut;
        });
    }
  }
}
