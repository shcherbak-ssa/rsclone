const { join: joinPaths } = require('path');
const { readdirSync, mkdirSync, readFileSync, writeFileSync } = require('fs');

const { LANGUAGES_DIRNAME } = require('./constants.script');
const { LANGUAGES_PATHNAME, DIST_PATHNAME } = require('./pathnames.script');

function moveLanguagesToDist() {
  const languageFolders = readLanguagesFolder();
  const languageFoldersFiles = readLanguageFolders(languageFolders);

  const languagesFolderDistPathname = createLanguagesFolderInDist();
  const languageFolderDistPathnames =
    createLanguageFoldersInDist(languagesFolderDistPathname, languageFolders);

  createLanguageFolderFilesInDist(languageFolderDistPathnames, languageFoldersFiles);
}

function readLanguagesFolder() {
  return readdirSync(LANGUAGES_PATHNAME);
}

function readLanguageFolders(languageFolders) {
  return languageFolders.map((folderName) => {
    const languageFolderPathname = joinPaths(LANGUAGES_PATHNAME, folderName);
    const languageFiles = readdirSync(languageFolderPathname);

    return languageFiles.map((languageFilename) => {
      const languageFilePathname = joinPaths(languageFolderPathname, languageFilename);
      const languageFileContent = readFileSync(languageFilePathname);
      const languageFileContentObject = JSON.parse(languageFileContent);

      return {
        filename: languageFilename,
        content: JSON.stringify(languageFileContentObject),
      };
    });
  });
}

function createLanguagesFolderInDist() {
  const languagesFolderDistPathname = joinPaths(DIST_PATHNAME, LANGUAGES_DIRNAME);
  mkdirSync(languagesFolderDistPathname);

  return languagesFolderDistPathname;
}

function createLanguageFoldersInDist(languagesFolderDistPathname, languageFolders) {
  return languageFolders.map((folderName) => {
    const languageFolderDistPathname = joinPaths(languagesFolderDistPathname, folderName);
    mkdirSync(languageFolderDistPathname);

    return languageFolderDistPathname;
  });
}

function createLanguageFolderFilesInDist(languageFolderDistPathnames, languageFoldersFiles) {
  languageFolderDistPathnames.forEach((languageFolderDistPathname, index) => {
    languageFoldersFiles[index].forEach(({filename, content}) => {
      const languageFileDistPathname = joinPaths(languageFolderDistPathname, filename);
      writeFileSync(languageFileDistPathname, content);
    });
  });
}

module.exports = { moveLanguagesToDist };
