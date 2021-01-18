import { AppRoutePathnames } from '../constants';
import { USERNAME_PATHNAME_INITIAL_STRING } from '../constants/strings.constants';
import { AppRoutes } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

export class AppRoutesService implements AppRoutes {
  private initialPath: string;

  constructor() {
    const userLocalStorage: UserLocalStorageService = new UserLocalStorageService();
    this.initialPath = USERNAME_PATHNAME_INITIAL_STRING + userLocalStorage.getUsername();
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
