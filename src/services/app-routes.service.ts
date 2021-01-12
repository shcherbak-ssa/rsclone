import {
  AppRoutePathnames,
  USER_LOCALSTORAGE_KEY,
  USERNAME_PATHNAME_INITIAL_STRING,
} from '../constants';
import { AppRoutes, LocalStorage } from '../types/services.types';
import { UserLocalStorageType } from '../types/user.types';
import { LocalStorageService } from './localstorage.service';

export class AppRoutesService implements AppRoutes {
  private initialPath: string;

  constructor() {
    const localStorageService: LocalStorage = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    this.initialPath = USERNAME_PATHNAME_INITIAL_STRING + localStorageUser.username;
  }

  getRootRoutePath(): string {
    return this.concatPaths(AppRoutePathnames.ROOT);
  }

  getSpacesRoutePath(): string {
    return this.concatPaths(AppRoutePathnames.SPACES);
  }

  getSettingsRoutePath(): string {
    return this.concatPaths(AppRoutePathnames.SETTINGS);
  }

  private concatPaths(routePath: string): string {
    return this.initialPath + routePath;
  }
}
