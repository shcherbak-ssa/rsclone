export const USER_LOCALSTORAGE_KEY: string = 'user';
export const USERNAME_PATHNAME_INITIAL_STRING: string = '/@';
export const EMPTY_VALUE_LENGTH: number = 0;
export const PLUS_STRING: string = '+';
export const SPACE_STRING: string = ' ';
export const EMPTY_SHORTCUT_STRING: string = '???';
export const JOIN_SHORTCUT_KEYS_STRING: string = ' + ';
export const DEFAULT_AVATAR_SIZE: number = 46;

export enum AppRoutePathnames {
  ROOT = '/',
  SPACES = '/spaces',
  SETTINGS = '/settings',
  REGISTRATION = '/registration',
  LOGIN = '/login',
};

export enum UserDataLabels {
  AVATAR = 'avatar',
  FULLNAME = 'fullname',
  EMAIL = 'email',
  PASSWORD = 'password',
  USERNAME = 'username',
  LANGUAGE = 'language',
  THEME = 'theme',
  SHORTCUTS = 'shortcuts',
};

export enum Stores {
  LANGUAGE_STORE = 'language-store',
  AUTH_STORE = 'auth-store',
  USER_DRAFT_STORE = 'user-draft-store',
  USER_STORE = 'user-store',
};

export enum AuthModes {
  REGISTRATION = 'registration',
  LOGIN = 'login',
};

export enum HomepageSectionLabels {
  SPACES = 'spaces',
  SETTINGS = 'settings',
};

export enum SettingsSectionLabels {
  USER = 'user',
  LOGIN = 'login',
  APP = 'app',
  SHORTCUTS = 'shortcuts',
  DANGER = 'danger',
};

export enum SettingsActionLabels {
  DELETE_ACCOUNT = 'delete-account',
  CHANGE_PASSWORD = 'change-password',
};

export enum SettingsGroupLabels {
  AVATAR = 'avatar',
  THEME = 'theme',
  USER_DATA = 'user-data',
  HOMEPAGE = 'homepage',
  SPACE = 'space',
};
