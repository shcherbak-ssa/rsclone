const { join: joinPaths } = require('path');
const {
  DIST_DIRNAME,
  LANGUAGES_DIRNAME,
  PUGLIC_BUILD_DIRNAME,
  SERVER_BUILD_DIRNAME
} = require('./constants.script');

const rootPathname = process.cwd();
const createDirPathname = (dirname) => joinPaths(rootPathname, dirname);

const DIST_PATHNAME = createDirPathname(DIST_DIRNAME);
const LANGUAGES_PATHNAME = createDirPathname(LANGUAGES_DIRNAME);
const PUGLIC_BUILD_PATHNAME = createDirPathname(PUGLIC_BUILD_DIRNAME);
const SERVER_BUILD_PATHNAME = createDirPathname(SERVER_BUILD_DIRNAME);

module.exports = {
  DIST_PATHNAME,
  LANGUAGES_PATHNAME,
  PUGLIC_BUILD_PATHNAME,
  SERVER_BUILD_PATHNAME,
};
