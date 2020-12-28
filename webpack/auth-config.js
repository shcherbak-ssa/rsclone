const commonConfig = require('./common-config');

const AUTH_ENTRY_DIRNAME = 'auth';
const AUTH_OUTPUT_DIRNAME = 'auth';
const AUTH_OUTPUT_FILENAME = 'auth.js';

const authConfig = (isDev) => {
  return commonConfig({
    isDev,
    entryDirname: AUTH_ENTRY_DIRNAME,
    outputDirname: AUTH_OUTPUT_DIRNAME,
    outputFilename: AUTH_OUTPUT_FILENAME,
  });
};

module.exports = authConfig;
