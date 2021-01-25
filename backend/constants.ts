export const INDEX_FILENAME: string = 'index.html';
export const ASSETS_EXTNAME_REGEXP: RegExp = /^\.(js|css|png|svg|ico)$/;
export const USERS_FILES_DB_DIRNAME: string = 'db';
export const MINUS_REPLACE_STRING: string = '-';
export const EMPTY_VALUE_LENGTH: number = 0;
export const INITIAL_PATHNAME_COUNT: number = 1;

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
  SPACE_ID = 'id',
  SPACE_NAME = 'name',
  SPACE_COLOR = 'color',
  SPACE_LOGO = 'logo',
  SPACE_PATHNAME = 'pathname',
  SPACE_PAGES = 'pages',
};
