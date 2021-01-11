import { extname, join } from 'path';
import { Request } from 'express';

import { LanguageParts } from '../../common/constants';
import { ASSETS_EXTNAME_REGEXP, INDEX_FILENAME } from '../constants';
import { StaticEntry, StaticLanguage } from '../types/static.types';
import serverConfig from '../../config/server.config.json';

export class StaticService implements StaticEntry, StaticLanguage {
  static publicPath: string = join(process.cwd(), serverConfig.app.publicFolder);

  private languagesFolder: string = serverConfig.app.languagesFolder;

  isAssetsRequest(request: Request): boolean {
    return ASSETS_EXTNAME_REGEXP.test(extname(request.originalUrl));
  }

  getEntryFilePath(): string {
    return join(StaticService.publicPath, INDEX_FILENAME);
  }

  createRequestedLanguagePartFilePath(
    requestedLanguage: string, requestedLanguagePart: LanguageParts,
  ): string {
    return join(
      process.cwd(),
      this.languagesFolder,
      requestedLanguage,
      `${requestedLanguagePart}.language.json`,
    );
  }
}
