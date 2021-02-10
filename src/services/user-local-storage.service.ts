import { USER_LOCALSTORAGE_KEY } from '../constants';
import { UserLocalStorage } from '../types/services.types';
import { UserLocalStorageType } from '../types/user.types';
import { LocalStorageService } from './localstorage.service';

export class UserLocalStorageService implements UserLocalStorage {
  private localStorageService: LocalStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  exist(): boolean {
    return this.localStorageService.exist(USER_LOCALSTORAGE_KEY);
  }

  getToken(): string {
    return this.getUserFromLocalStorage().token;
  }

  getUsername(): string {
    return this.getUserFromLocalStorage().username;
  }

  saveUser(user: UserLocalStorageType): void {
    this.localStorageService.save(USER_LOCALSTORAGE_KEY, user);
  }

  removeUser(): void {
    this.localStorageService.remove(USER_LOCALSTORAGE_KEY);
  }

  private getUserFromLocalStorage(): UserLocalStorageType {
    return this.localStorageService.get(USER_LOCALSTORAGE_KEY);
  }
}
