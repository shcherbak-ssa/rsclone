import { join } from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { serverConfig } from './server.config';
import { AppOptions, App } from './app';
import { AuthRouter, UserRouter } from './routers';
import { UsersDB } from './models/types';

declare global {
  namespace Express {
    interface Request {
      user?: UsersDB
    }
  }
}

const appOptions: AppOptions = {
  port: serverConfig.port,
  hostname: serverConfig.hostname,
  publicPath: join(serverConfig.publicDirname, 'public'),
  routers: [
    AuthRouter.init(),
    UserRouter.init(),
  ],
  middlewares: [
    cookieParser(),
    bodyParser.json(),
  ],
};

App.init(appOptions).listen();
