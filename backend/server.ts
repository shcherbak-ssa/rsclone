import { join } from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { serverConfig } from './server.config';
import { AppOptions, App } from './app';
import { AuthRouter, AppRouter } from './routers';

const appOptions: AppOptions = {
  port: serverConfig.port,
  hostname: serverConfig.hostname,
  publicPath: join(serverConfig.publicDirname, 'public'),
  routers: [
    AuthRouter.init(),
    AppRouter.init(),
  ],
  middlewares: [
    cookieParser(),
    bodyParser.json(),
  ],
};

App.init(appOptions).listen();
