import { extname, join } from 'path';
import { Request } from 'express';

import { ASSETS_EXTNAME_REGEXP, INDEX_FILENAME } from '../constants';
import { StaticEntryMiddleware } from '../types/static.types';
import serverConfig from '../../config/server.config.json';

export class StaticService implements StaticEntryMiddleware {
  static publicPath: string = join(process.cwd(), serverConfig.app.publicFolder);

  isAssetsRequest(request: Request) {
    return ASSETS_EXTNAME_REGEXP.test(extname(request.originalUrl));
  }

  getRootFilePath() {
    return join(StaticService.publicPath, INDEX_FILENAME);
  }
}
