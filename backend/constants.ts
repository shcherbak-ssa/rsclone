export const INDEX_FILENAME: string = 'index.html';
export const ASSETS_EXTNAME_REGEXP: RegExp = /^\.(js|css|png|svg|ico)$/;
export const USERS_FILES_DB_DIRNAME: string = 'db';
export const MINUS_REPLACE_STRING: string = '-';
export const EMPTY_VALUE_LENGTH: number = 0;
export const INITIAL_PATHNAME_COUNT: number = 1;
export const EMPTY_STRING: string = '';
export const DEFAULT_PORT: string = '3000';

export { UserDataLabels } from '../common/constants';

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
