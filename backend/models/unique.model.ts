import { UserDataLabels } from '../constants';
import { ErrorLabels } from '../../common/constants';
import { ValidationError } from '../../common/validation';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { SpacesCollectionDatabase } from '../database/spaces-collection.database';

export interface UniqueUserDatabase {
  isUsernameUnique(username: string): Promise<boolean>;
  isEmailUnique(email: string): Promise<boolean>;
}

export interface UniqueSpaceDatabase {
  isSpacePathnameUnique(userID: string, spacePathname: string): Promise<boolean>;
}

export class UniqueModel {
  private userDatabase: UniqueUserDatabase;
  private spaceDatabase: UniqueSpaceDatabase;

  constructor() {
    this.userDatabase = usersCollectionDatabase;
    this.spaceDatabase = new SpacesCollectionDatabase();
  }
  
  async isUsernameUnique(username: string): Promise<boolean> {
    return await this.userDatabase.isUsernameUnique(username);
  }

  async checkExistingUserWithCurrentUsername(username: string): Promise<void> {
    const isUsernameUnique: boolean = await this.userDatabase.isUsernameUnique(username);

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
    const isEmailUnique: boolean = await this.userDatabase.isEmailUnique(email);

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

  async isSpacePathnameUnique(userID: string, spacePathname: string): Promise<boolean> {
    return await this.spaceDatabase.isSpacePathnameUnique(userID, spacePathname);
  }
}
