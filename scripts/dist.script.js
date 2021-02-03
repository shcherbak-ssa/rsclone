const { existsSync, rmdirSync, mkdirSync } = require('fs');
const { DIST_DIRNAME } = require('./dirnames.script');

function preparingDistFolder() {
  if (distDirnameExist()) {
    deleteDistDirname();
  }

  createDistDirname();
}

function distDirnameExist() {
  return existsSync(DIST_DIRNAME);
}

function deleteDistDirname() {
  rmdirSync(DIST_DIRNAME, { recursive: true });
}

function createDistDirname() {
  mkdirSync(DIST_DIRNAME);
}

module.exports = { preparingDistFolder };
