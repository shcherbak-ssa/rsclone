import { User, VerifyUser } from '../types/user.types';
import { RegistrationUser } from '../../common/user';
import { defaultKeyboardShortcuts } from '../data/keyboard-shortcut.data';
import { usersCollectionDatabase } from '../database/users-collection.database';

export interface CreateUserDatabase {
  createUser(newUser: User): Promise<string>;
  isUsernameUnique(username: string): Promise<boolean>;
}

export class RegistrationModel {
  private database: CreateUserDatabase;

  constructor() {
    this.database = usersCollectionDatabase;
  }

  async createUser(registrationUser: RegistrationUser): Promise<VerifyUser> {
    const newUser: User = await this.createNewUser(registrationUser);
    const userID: string = await this.database.createUser(newUser);
    
    return {
      userID,
      username: newUser.username,
    };
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
