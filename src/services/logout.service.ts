import { UserLocalStorage } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

export class LogoutService {
  logoutUser() {
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();
    userLocalStorage.removeUser();
    location.replace(location.origin);
  }
}
