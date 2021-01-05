import { USER_LOCALSTORAGE_LABEL, APP_INITIAL_ROUTES_STRING } from "../constants";
import { LocalStorageService } from "./localstorage.service";

enum AppRoutes {
  ROOT = '/',
  SPACES = '/spaces',
  SETTINGS = '/settings',
};

export class AppRoutesService {
  private initialPath: string;

  constructor() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const user = localStorageService.get(USER_LOCALSTORAGE_LABEL);

    this.initialPath = APP_INITIAL_ROUTES_STRING + user.username;
  }

  getRootRoutePath() {
    return this.concatPaths(AppRoutes.ROOT);
  }

  getSpacesRoutePath() {
    return this.concatPaths(AppRoutes.SPACES);
  }

  getSettingsRoutePath() {
    return this.concatPaths(AppRoutes.SETTINGS);
  }

  private concatPaths(routePath: string) {
    return this.initialPath + routePath;
  }
}
