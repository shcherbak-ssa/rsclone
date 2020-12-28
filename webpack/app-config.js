const commonConfig = require('./common-config');

const APP_ENTRY_DIRNAME = 'app';
const APP_OUTPUT_DIRNAME = 'app';
const APP_OUTPUT_FILENAME = 'app.js';

const appConfig = (isDev) => {
  return commonConfig({
    isDev,
    entryDirname: APP_ENTRY_DIRNAME,
    outputDirname: APP_OUTPUT_DIRNAME,
    outputFilename: APP_OUTPUT_FILENAME,
  });
};

module.exports = appConfig;
