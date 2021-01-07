import { join } from 'path';
import { serverConfig } from './server.config';

const ROOT_REGEXP_PATHNAME: RegExp = /^\//;
const AUTH_REGEXP_PATHNAME: RegExp = /^\/(registration|login)/;

const INDEX_FILENAME: string = 'index.html';
const AVATARS_PATHNAME: string = '/avatars';

const ROOT_FILENAME: string = join(serverConfig.publicDirname, INDEX_FILENAME);
const DB_DIRNAME: string = join(process.cwd(), 'db');
const USER_DB_FILENAME: string = join(DB_DIRNAME, 'users.json');
const AVATARS_DB_DIRNAME: string = join(DB_DIRNAME, 'avatars');

enum Theme {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

enum Language {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
};

export {
  AVATARS_PATHNAME,
  ROOT_REGEXP_PATHNAME,
  AUTH_REGEXP_PATHNAME,
  ROOT_FILENAME,
  AVATARS_DB_DIRNAME,
  DB_DIRNAME,
  USER_DB_FILENAME,
  Theme,
  Language,
};
