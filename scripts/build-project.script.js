const { preparingDistFolder } = require('./dist.script');
const { moveLanguagesToDist } = require('./languages.script');

preparingDistFolder();

moveLanguagesToDist();
