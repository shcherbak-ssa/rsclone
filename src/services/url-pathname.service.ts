import { LanguageLabels, MiddlewarePathnames } from '../../common/constants';
import { LanguageUrlPathname } from '../models/language.model';

export class UrlPathnameService implements LanguageUrlPathname {
  getLanguagePathname(language: LanguageLabels): string {
    return this.replacePatameter(MiddlewarePathnames.LANGUAGES, language);
  }

  private replacePatameter(pathname: string, replaceString: string) {
    return pathname.replace(/:[a-z]+$/, replaceString);
  }
}
