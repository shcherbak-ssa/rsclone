import { join } from 'path';
import cookieParser from 'cookie-parser';

import { serverConfig } from './server.config';
import { AppOptions, App } from './app';
import { AuthRouter } from './routers';

const appOptions: AppOptions = {
  port: serverConfig.port,
  hostname: serverConfig.hostname,
  publicPath: join(serverConfig.publicDirname, 'public'),
  routers: [
    AuthRouter.init(),
  ],
  middlewares: [
    cookieParser()
  ],
};

App.init(appOptions).listen();
