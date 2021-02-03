const { join } = require('path');
const { rmdirSync } = require('fs');

const processDirname = process.cwd();
const removeDirOptions = {
  recursive: true,
};

function removeBuildDir(buildType) {
  const buildDirname = createBuildDirname(buildType);
  rmdirSync(buildDirname, removeDirOptions);
}

function createBuildDirname(buildType) {
  return join(processDirname, buildType);
}

module.exports = { removeBuildDir };
