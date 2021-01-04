const THEME_LOCALSTORAGE_LABEL: string = 'app-theme';

enum Theme {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

enum AppRoutes {
  ROOT = '/',
  SETTINGS = '/settings',
}

export {
  THEME_LOCALSTORAGE_LABEL,
  Theme,
  AppRoutes,
};
