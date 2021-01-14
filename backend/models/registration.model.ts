import { CreatedUser, User } from '../types/user.types';
import { RegistrationUser } from '../../common/user';
import { defaultKeyboardShortcuts } from '../data/keyboard-shortcut.data';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { AuthUserModel } from './auth-user.model';

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

  async checkExitingUserWithCurrentEmail(email: string): Promise<boolean> {
    return await this.database.isEmailUnique(email);
  }

  async createUser(registrationUser: RegistrationUser): Promise<CreatedUser> {
    try {
      const newUser: User = await this.createNewUser(registrationUser);
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

  private async createNewUser(registrationUser: RegistrationUser): Promise<User> {
    const username: string = await this.createUsername(registrationUser.email);

    return {
      ...registrationUser,
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
