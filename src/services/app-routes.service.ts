import {
  AppRoutePathnames,
  USER_LOCALSTORAGE_KEY,
  USERNAME_PATHNAME_INITIAL_STRING,
} from "../constants";
import { UserLocalStorageType } from "../types/user.types";
import { LocalStorageService } from "./localstorage.service";

export class AppRoutesService {
  private initialPath: string;

  constructor() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    this.initialPath = USERNAME_PATHNAME_INITIAL_STRING + localStorageUser.username;
  }

  getRootRoutePath() {
    return this.concatPaths(AppRoutePathnames.ROOT);
  }

  getSpacesRoutePath() {
    return this.concatPaths(AppRoutePathnames.SPACES);
  }

  getSettingsRoutePath() {
    return this.concatPaths(AppRoutePathnames.SETTINGS);
  }

  private concatPaths(routePath: string) {
    return this.initialPath + routePath;
  }
}
