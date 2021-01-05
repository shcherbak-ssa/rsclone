const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';

const EMPTY_VALUE_LENGTH: number = 0;

const THEME_LOCALSTORAGE_LABEL: string = 'app-theme';

enum Theme {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
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
  IS_ERROR_CLASSNAME,
  EMPTY_VALUE_LENGTH,
  THEME_LOCALSTORAGE_LABEL,
  Theme,
  ButtonTypes,
  MenuItemLabels,
  SettingsLabels,
  UserEvents,
};
