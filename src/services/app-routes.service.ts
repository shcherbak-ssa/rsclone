import { AppRoutePathnames } from '../constants';
import { SPACE_PATHNAME_REPLACE_STRING, USERNAME_PATHNAME_INITIAL_STRING, USERNAME_REPLACE_STRING } from '../constants/strings.constants';
import { AppRoutes } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

export class AppRoutesService implements AppRoutes {
  private username: string;

  constructor() {
    const userLocalStorage: UserLocalStorageService = new UserLocalStorageService();
    this.username = USERNAME_PATHNAME_INITIAL_STRING + userLocalStorage.getUsername();
  }

  getRootRoutePath(): string {
    return this.replaceUsername(AppRoutePathnames.ROOT);
  }

  getSpacesRoutePath(): string {
    return this.replaceUsername(AppRoutePathnames.SPACES);
  }

  getSettingsRoutePath(): string {
    return this.replaceUsername(AppRoutePathnames.SETTINGS);
  }

  getSpacePageRoutePath(spacePathname: string): string {
    return this
      .replaceUsername(AppRoutePathnames.SPACE_PAGE)
      .replace(SPACE_PATHNAME_REPLACE_STRING, spacePathname);
  }

  private replaceUsername(routePath: string): string {
    return routePath.replace(USERNAME_REPLACE_STRING, this.username);
  }
}
