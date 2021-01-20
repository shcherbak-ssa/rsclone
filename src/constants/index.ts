export const USER_LOCALSTORAGE_KEY: string = 'user';
export const EMPTY_VALUE_LENGTH: number = 0;
export const DEFAULT_AVATAR_SIZE: number = 46;
export const SETTINGS_AVATAR_SIZE: number = 98;
export const JSON_CONTENT_TYPE: string = 'application/json; charset=utf-8';
export const CONTENT_TYPE_HEADER: string = 'Content-Type';

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
  NEW_PASSWORD = 'newPassword',
  USERNAME = 'username',
  LANGUAGE = 'language',
  THEME = 'theme',
  SHORTCUTS = 'shortcuts',
  SPACE_ID = 'id',
  SPACE_NAME = 'name',
  SPACE_COLOR = 'color',
  SPACE_LOGO = 'logo',
};

export enum Stores {
  LANGUAGE_STORE = 'language-store',
  AUTH_STORE = 'auth-store',
  USER_DRAFT_STORE = 'user-draft-store',
  USER_STORE = 'user-store',
  SPACES_STORE = 'spaces-store',
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
  SPACE = 'space',
};

export enum SettingsActionLabels {
  DELETE_ACCOUNT = 'delete-account',
  CHANGE_PASSWORD = 'change-password',
};

export enum SettingsGroupLabels {
  AVATAR = 'avatar',
  PASSWORD = 'password',
  THEME = 'theme',
  USER_DATA = 'user-data',
  HOMEPAGE = 'homepage',
  SPACE = 'space',
  SPACE_COLOR = 'color',
};

export enum DropdownItemLabels {
  DELETE_SPACE = 'delete-space',
  SETTINGS_SPACE = 'settings-space',
};
