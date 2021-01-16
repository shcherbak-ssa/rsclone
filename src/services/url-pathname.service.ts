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
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();
    const username: string = userLocalStorage.getUsername();
    
    return this.replacePatameter(RequestPathnames.USERS, username);
  }

  private replacePatameter(pathname: string, replaceString: string) {
    return pathname.replace(/:[a-z]+/, replaceString);
  }
}
