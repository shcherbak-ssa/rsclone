import { join } from "path";

const ROOT_REGEXP_PATHNAME: RegExp = /^\//;
const AUTH_REGEXP_PATHNAME: RegExp = /^\/(registration|login)/;

const ROOT_FILENAME: string = 'index.html';

const DB_DIRNAME: string = join(process.cwd(), 'backend', 'db');
const USER_DB_FILENAME: string = join(DB_DIRNAME, 'users.json');

export {
  ROOT_REGEXP_PATHNAME,
  AUTH_REGEXP_PATHNAME,
  ROOT_FILENAME,
  USER_DB_FILENAME,
};
