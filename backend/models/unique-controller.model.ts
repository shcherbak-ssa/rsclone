import { UserDataLabels } from '../constants';
import { ErrorLabels } from '../../common/constants';
import { ValidationError } from '../../common/validation';
import { usersCollectionDatabase } from '../database/users-collection.database';

export interface UniqueControllerDatabase {
  isUsernameUnique(username: string): Promise<boolean>;
  isEmailUnique(email: string): Promise<boolean>;
}

export class UniqueControllerModel {
  private database: UniqueControllerDatabase;

  constructor() {
    this.database = usersCollectionDatabase;
  }
  
  async isUsernameUnique(username: string): Promise<boolean> {
    return await this.database.isUsernameUnique(username);
  }

  async checkExistingUserWithCurrentUsername(username: string): Promise<void> {
    const isUsernameUnique: boolean = await this.database.isUsernameUnique(username);

    if (!isUsernameUnique) {
      throw new ValidationError(
        'User with current username is already exist',
        {
          dataLabel: UserDataLabels.USERNAME,
          errorLabel: ErrorLabels.USERNAME_EXIST,
        }
      );
    }
  }

  async checkExistingUserWithCurrentEmail(email: string): Promise<void> {
    const isEmailUnique: boolean = await this.database.isEmailUnique(email);

    if (!isEmailUnique) {
      throw new ValidationError(
        'User with current e-mail is already exist',
        {
          dataLabel: UserDataLabels.EMAIL,
          errorLabel: ErrorLabels.EMAIL_EXIST,
        }
      );
    }
  }
}
