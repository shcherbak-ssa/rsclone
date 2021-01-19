import { GetUser, User } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UpdatedUserData } from '../types/user.types';
import { EMPTY_VALUE_LENGTH } from '../../src/constants';
import { UniqueModel } from './unique.model';
import { UserDataLabels } from '../constants';
import { KeyboardShortcut, Space } from '../../common/entities';
import { ClientError } from '../services/errors.service';
import { ErrorLabels, StatusCodes } from '../../common/constants';
import { UserFiles } from '../types/services.types';
import { UserFilesService } from '../services/user-files.service';
import { SpacesModel } from './spaces.model';

export interface UsersDatabase {
  getUser(userID: string): Promise<User>;
  getKeyboardShortcuts(userID: string): Promise<KeyboardShortcut[]>;
  isCorrectPassword(userID: string, password: string): Promise<boolean>;
  updateUser(userID: string, updatedData: UpdatedUserData): Promise<void>;
  deleteUser(userID: string): Promise<void>;
}

export class UsersModel {
  private database: UsersDatabase;
  private userFiles: UserFiles;
  private uniqueModel: UniqueModel;
  private spacesModel: SpacesModel;
  
  constructor() {
    this.database = usersCollectionDatabase;
    this.userFiles = new UserFilesService();
    this.uniqueModel = new UniqueModel();
    this.spacesModel = new SpacesModel();
  }

  async getUser(userID: string): Promise<GetUser> {
    const user: User = await this.database.getUser(userID);
    const spaces: Space[] = await this.spacesModel.getSpaces(userID);

    return {user, spaces};
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<any> {
    if (Object.keys(updatedData).length === EMPTY_VALUE_LENGTH) return {};

    await this.checkExistingUserWithCurrentUsername(updatedData);
    await this.checkExistingUserWithCurrentEmail(updatedData);
    await this.validatePassword(userID, updatedData);
    await this.preparingKeyboardShorcutsForUpdating(userID, updatedData);

    await this.database.updateUser(userID, updatedData);
    this.removePasswordFromUpdatedData(updatedData);

    return {...updatedData};
  }

  async deleteUser(userID: string): Promise<any> {
    await this.database.deleteUser(userID);
    await this.userFiles.deleteUserFilesFolder(userID);

    return { deleted: true };
  }

  private async checkExistingUserWithCurrentUsername(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.USERNAME in updatedData) {
      const username = updatedData[UserDataLabels.USERNAME] as string;
      await this.uniqueModel.checkExistingUserWithCurrentUsername(username);
    }
  }

  private async checkExistingUserWithCurrentEmail(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.EMAIL in updatedData) {
      const email = updatedData[UserDataLabels.EMAIL] as string;
      await this.uniqueModel.checkExistingUserWithCurrentEmail(email);
    }
  }

  private async validatePassword(userID: string, updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.PASSWORD in updatedData) {
      const password = updatedData[UserDataLabels.PASSWORD] as string;
      const newPassword = updatedData[UserDataLabels.NEW_PASSWORD] as string;
      const isCorrectPassword: boolean = await this.database.isCorrectPassword(userID, password);

      if (isCorrectPassword) {
        updatedData[UserDataLabels.PASSWORD] = newPassword;
        delete updatedData[UserDataLabels.NEW_PASSWORD];
      } else {
        throw new ClientError(
          'Invalid password',
          StatusCodes.BAD_REQUEST,
          {
            errorLabel: ErrorLabels.INVALID_PASSWORD,
            dataLabel: UserDataLabels.PASSWORD
          },
        );
      }
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

  private removePasswordFromUpdatedData(updatedData: UpdatedUserData): void {
    if (UserDataLabels.PASSWORD in updatedData) {
      delete updatedData[UserDataLabels.PASSWORD];
    }
  }
}
