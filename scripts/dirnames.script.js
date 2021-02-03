const { join: joinPaths } = require('path');

const rootPathname = process.cwd();
const createDirPathname = (dirname) => joinPaths(rootPathname, dirname);

const DIST_DIRNAME = createDirPathname('dist');
const LANGUAGES_DIRNAME = createDirPathname('languages');
const PUGLIC_BUILD_DIRNAME = createDirPathname('public');
const SERVER_BUILD_DIRNAME = createDirPathname('server');

module.exports = {
  DIST_DIRNAME,
  LANGUAGES_DIRNAME,
  PUGLIC_BUILD_DIRNAME,
  SERVER_BUILD_DIRNAME,
};
