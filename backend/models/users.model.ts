import { User } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UpdatedUserData } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { KeyboardShortcut } from '../../common/entities';
import { ClientError, ServerError } from '../services/errors.service';
import { ErrorLabels, StatusCodes } from '../../common/constants';
import { UserFiles } from '../types/services.types';
import { UserFilesService } from '../services/user-files.service';
import { DeleteDatabase } from '../types/database.types';
import { DatabaseDBService } from '../services/database-db.service';

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
  
  constructor() {
    this.database = usersCollectionDatabase;
    this.userFiles = new UserFilesService();
  }

  async getUser(userID: string): Promise<User> {
    return await this.database.getUser(userID);
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<any> {
    await this.validatePassword(userID, updatedData);
    await this.preparingKeyboardShorcutsForUpdating(userID, updatedData);

    await this.database.updateUser(userID, updatedData);
    this.removePasswordFromUpdatedData(updatedData);

    return {...updatedData};
  }

  async deleteUser(userID: string): Promise<any> {
    try {
      await this.database.deleteUser(userID);
      await this.userFiles.deleteUserFilesFolder(userID);

      const userDatabase: DeleteDatabase = DatabaseDBService.createDatabase(userID);
      await userDatabase.delete();

      return { deleted: true };
    } catch (error) {
      throw new ServerError(error.message, {deleted: false});
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
