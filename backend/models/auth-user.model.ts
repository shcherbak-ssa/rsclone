import { Language, Theme } from '../constants';
import { UsernameService } from '../services/username.service';
import { KeyboardShortcutType, UserDB, UsersDB } from './types';

const keyboardShortcuts: Array<KeyboardShortcutType> = [];

interface User {
  name?: string;
  email: string;
  password: string;
}

export class AuthUser implements User {
  name: string;
  email: string;
  password: string;
  username: string;

  constructor({name = '', email, password}: User) {
    this.name = name;
    this.email = email.toLowerCase();
    this.password = password;
    this.username = this.createUsername();
  }

  getEmailForCheck() {
    return this.email;
  }

  getDataToCreateUserDB(): UserDB {
    return {
      spaces: [],
    }
  }

  getDataForUsersDB(newUserID: number): UsersDB {
    return {
      id: newUserID,
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username,
      avatar: '',
      theme: Theme.ORIGINAL,
      language: Language.ENGLISH,
      keyboardShortcuts,
    }
  }

  private createUsername() {
    const usernameService: UsernameService = new UsernameService();
    return usernameService.createUsername(this.email);
  }
}
