import { ShortcurtsSections, ShortcutsLabels } from '../../core/constants';
import { KeyboardShortcutType, UserType } from '../../core/types';
import { Language, Theme } from '../constants';
import { UserDB } from './types';
import { UsernameService } from '../services/username.service';

const keyboardShortcuts: Array<KeyboardShortcutType> = [
  {
    title: 'Add space',
    description: 'Create yout personal space',
    section: ShortcurtsSections.HOMEPAGE,
    keys: 'ctrl+shift+s',
    label: ShortcutsLabels.ADD_SPACE,
  },
];

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

  getDataForUsersDB(newUserID: number): UserType {
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
