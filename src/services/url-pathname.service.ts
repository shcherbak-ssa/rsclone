import { LanguageLabels, MiddlewarePathnames, RequestPathnames } from '../../common/constants';
import { UsersUrlPathname } from '../models/base.model';
import { LanguageUrlPathname } from '../models/language.model';
import { UserLocalStorage } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

export class UrlPathnameService implements LanguageUrlPathname, UsersUrlPathname {
  getLanguagePathname(language: LanguageLabels): string {
    return this.replacePatameter(MiddlewarePathnames.LANGUAGES, language);
  }

  getUsersPathname(): string {
    return this.getPathname(RequestPathnames.USERS);
  }

  getAvatarsPathname(): string {
    return this.getPathname(RequestPathnames.AVATARS);
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
    return pathname.replace(/:[a-z]+/, replaceString);
  }
}
