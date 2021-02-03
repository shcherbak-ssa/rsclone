const { existsSync, rmdirSync, mkdirSync } = require('fs');
const { DIST_PATHNAME } = require('./pathnames.script');

function preparingDistFolder() {
  if (distDirnameExist()) {
    deleteDistDirname();
  }

  createDistDirname();
}

function distDirnameExist() {
  return existsSync(DIST_PATHNAME);
}

function deleteDistDirname() {
  rmdirSync(DIST_PATHNAME, { recursive: true });
}

function createDistDirname() {
  mkdirSync(DIST_PATHNAME);
}

module.exports = { preparingDistFolder };
