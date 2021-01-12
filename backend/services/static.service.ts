import { extname, join } from 'path';
import { promises as fsPromises } from 'fs';
import { Request } from 'express';

import { LanguageParts } from '../../common/constants';
import { ASSETS_EXTNAME_REGEXP, INDEX_FILENAME } from '../constants';
import { StaticEntry, StaticLanguage } from '../types/static.types';
import serverConfig from '../../config/server.config.json';

export class StaticService implements StaticEntry, StaticLanguage {
  private languagesFolder: string = serverConfig.app.languagesFolder;

  static publicPath: string = join(process.cwd(), serverConfig.app.publicFolder);

  isAssetsRequest(request: Request): boolean {
    return ASSETS_EXTNAME_REGEXP.test(extname(request.originalUrl));
  }

  getEntryFilePath(): string {
    return join(StaticService.publicPath, INDEX_FILENAME);
  }

  async readLanguageFile(language: string, languagePart: LanguageParts): Promise<any> {
    const languagePartFilePath: string = this.createLanguagePartFilePath(language, languagePart);
    const fileContent: string = await fsPromises.readFile(languagePartFilePath, {encoding: 'utf-8'});
    return [languagePart, JSON.parse(fileContent)];
  }

  private createLanguagePartFilePath(language: string, languagePart: LanguageParts): string {
    return join(
      process.cwd(), this.languagesFolder, language, `${languagePart}.language.json`,
    );
  }
}
