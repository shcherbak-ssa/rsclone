const { join: joinPaths } = require('path');
const { DIST_DIRNAME, LANGUAGES_DIRNAME } = require('./constants.script');

const rootPathname = process.cwd();
const createDirPathname = (dirname) => joinPaths(rootPathname, dirname);

const DIST_PATHNAME = createDirPathname(DIST_DIRNAME);
const LANGUAGES_PATHNAME = createDirPathname(LANGUAGES_DIRNAME);

module.exports = {
  DIST_PATHNAME,
  LANGUAGES_PATHNAME,
};
