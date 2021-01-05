const IS_ACTIVE_CLASSNAME: string = 'is-active';

const THEME_LOCALSTORAGE_LABEL: string = 'app-theme';

enum Theme {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

enum AppRoutes {
  ROOT = '/app',
  SETTINGS = '/app/settings',
};

enum MenuItemLabels {
  SPACES = 'space',
  SETTINGS = 'settings',
};

enum SettingsLabels {
  USER = 'settings-user',
  LOGIN = 'settings-login',
  APP = 'settings-app',
  SHORTCUTS = 'settings-shortcuts',
  DANGER = 'settings-danger',
};

enum UserEvents {
  LOAD_USER = 'user-events/load-user',
};

export {
  IS_ACTIVE_CLASSNAME,
  THEME_LOCALSTORAGE_LABEL,
  Theme,
  AppRoutes,
  MenuItemLabels,
  SettingsLabels,
  UserEvents,
};
