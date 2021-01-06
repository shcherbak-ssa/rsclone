const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';
const IS_OPEN_CLASSNAME: string = 'is-open';

const EMPTY_VALUE_LENGTH: number = 0;

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
  DELETE_ACCOUNT = 'user-events/delete-account',
};

enum AppEvents {
  SHOW_POPUP = 'app-events/show-popup',
  CLOSE_POPUP = 'app-events/close-popup',
};

enum SettingsEvents {
  INIT_SETTINGS = 'settings-events/init',
  UPDATE_EMAIL = 'settings-events/update-email',
  UPDATE_USER = 'settings-events/update-user',
  UPDATE_APP = 'settings-events/update-app',
  REMOVE_SETTINGS = 'settings-events/remove-settings',
};

const languages = [
  {
    label: 'en',
    value: 'English',
  },
  {
    label: 'ru',
    value: 'Russian',
  },
  {
    label: 'it',
    value: 'Italian',
  },
];

export {
  IS_ACTIVE_CLASSNAME,
  IS_ERROR_CLASSNAME,
  IS_OPEN_CLASSNAME,
  EMPTY_VALUE_LENGTH,
  Theme,
  ButtonTypes,
  MenuItemLabels,
  SettingsLabels,
  UserEvents,
  AppEvents,
  SettingsEvents,
  languages,
};
