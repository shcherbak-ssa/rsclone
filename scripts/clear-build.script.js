const { join } = require('path');
const { rmdirSync } = require('fs');

const processDirname = process.cwd();
const removeDirOptions = {
  recursive: true,
};

const publicBuildDirname = join(processDirname, 'public');
const serverBuildDirname = join(processDirname, 'server');

rmdirSync(publicBuildDirname, removeDirOptions);
rmdirSync(serverBuildDirname, removeDirOptions);
