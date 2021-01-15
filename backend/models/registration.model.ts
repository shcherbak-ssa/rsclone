import { AccessUser, User, RegistrationUser } from '../types/user.types';
import { defaultKeyboardShortcuts } from '../data/keyboard-shortcut.data';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { AuthUserModel } from './auth-user.model';
import { ValidationError } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { ErrorLabels } from '../../common/constants';

export interface CreateUserDatabase {
  createUser(newUser: User): Promise<string>;
  isUsernameUnique(username: string): Promise<boolean>;
  isEmailUnique(email: string): Promise<boolean>;
}

export class RegistrationModel {
  private database: CreateUserDatabase;
  private authUserModel: AuthUserModel;

  constructor() {
    this.database = usersCollectionDatabase;
    this.authUserModel = new AuthUserModel();
  }

  async checkExistingUserWithCurrentEmail(email: string): Promise<void> {
    const isEmailUnique: boolean = await this.database.isEmailUnique(email);

    if (!isEmailUnique) {
      throw new ValidationError(
        'User with current e-mail is alreayd exist',
        {
          dataLabel: UserDataLabels.EMAIL,
          errorLabel: ErrorLabels.EMAIL_EXIST,
        }
      );
    }
  }

  async createUser(user: RegistrationUser): Promise<AccessUser> {
    try {
      const newUser: User = await this.createNewUser(user);
      const userID: string = await this.database.createUser(newUser);
      const token: string = await this.authUserModel.createAccessToken(userID);
      
      return {
        username: newUser.username,
        token,
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  private async createNewUser(user: RegistrationUser): Promise<User> {
    const username: string = await this.createUsername(user.email);

    return {
      ...user,
      username,
      avatar: false,
      shortcuts: defaultKeyboardShortcuts,
    };
  }

  private async createUsername(email: string): Promise<string> {
    const username: string = this.createUsernameFromEmail(email);
    const isUnique: boolean = await this.database.isUsernameUnique(username);

    if (isUnique) return username;

    // @TODO: if username is not unique
    return '';
  }

  private createUsernameFromEmail(email: string): string {
    return email.split('@')[0].replace('.', '-');
  }
}
