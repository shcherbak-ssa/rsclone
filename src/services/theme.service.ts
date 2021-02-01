import { Themes } from '../../common/constants';
import { DocumentElementIDs } from '../constants/ui.constants';

const HREF_HTML_ATTRIBUTE: string = 'href';

export class ThemeService {
  static loadTheme(theme: Themes): void {
    const themeService: ThemeService = new ThemeService();
    const themeFilePathname: string = themeService.getThemeFilePathname(theme);
    const themeLinkElement: HTMLElement = themeService.findThemeLinkElement();

    themeLinkElement.setAttribute(HREF_HTML_ATTRIBUTE, themeFilePathname);
  }

  getThemeFilePathname(theme: string): string {
    return `/css/${theme}.css`;
  }

  findThemeLinkElement(): HTMLElement {
    return document.getElementById(DocumentElementIDs.THEME);
  }
}
