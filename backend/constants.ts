export const INDEX_FILENAME: string = 'index.html';
export const ASSETS_EXTNAME_REGEXP: RegExp = /^\.(js|css|png|svg|ico)$/;
export const EMPTY_VALUE_LENGTH: number = 0;

export const USERS_FILES_DB_DIRNAME: string = 'db';

export enum DatabaseNames {
  USERS = 'users',
};

export enum CollectionNames {
  USERS = 'users',
  SPACES = 'spaces',
};

export enum Parameters {
  USERNAME = 'username',
  LANGUAGE = 'language',
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
};
