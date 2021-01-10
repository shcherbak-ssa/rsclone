import {
  USERNAME_PATHNAME_INITIAL_STRING,
  USER_LOCALSTORAGE_KEY,
} from '../constants';
import { UserLocalStorageType } from '../types/user.types';
import { LocalStorageService } from './localstorage.service';

export class UsernameService {
  getUsernamePathname() {
    const localStorageService = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    if (localStorageUser) {
      return this.createUsernamePathname(localStorageUser.username);
    } else {
      console.log('User did not find in localStorage');
    }
  }

  private createUsernamePathname(username: string) {
    return USERNAME_PATHNAME_INITIAL_STRING + username;
  }
}
