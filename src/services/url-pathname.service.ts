import { LanguageLabels, MiddlewarePathnames, RequestPathnames } from '../../common/constants';
import { UserLocalStorage, UsersUrlPathname } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

export class UrlPathnameService implements UsersUrlPathname {
  getLanguagePathname(language: LanguageLabels): string {
    return this.replacePatameter(MiddlewarePathnames.LANGUAGES, language);
  }

  getUsersPathname(): string {
    return this.getPathname(RequestPathnames.USERS);
  }

  getAvatarsPathname(): string {
    return this.getPathname(RequestPathnames.AVATARS);
  }

  getSpacesPathname(): string {
    return this.getPathname(RequestPathnames.SPACES);
  }

  getPagesPathname(spacePathname: string): string {
    const pagesPathnameTemplate: string = this.getPathname(RequestPathnames.PAGES);
    return this.replacePatameter(pagesPathnameTemplate, spacePathname);
  }

  private getPathname(templatePathname: RequestPathnames): string {
    const username: string = this.getUsername();
    return this.replacePatameter(templatePathname, username);
  }

  private getUsername(): string {
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();
    return userLocalStorage.getUsername();
  }

  private replacePatameter(pathname: string, replaceString: string) {
    return pathname.replace(/:[a-z]+/i, replaceString);
  }
}
