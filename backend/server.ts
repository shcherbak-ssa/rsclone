import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { UserType } from '../core/types';
import { serverConfig } from './server.config';
import { AppOptions, App } from './app';
import { AuthRouter, UserRouter, SettingsRouter } from './routers';

declare global {
  namespace Express {
    interface Request {
      user?: UserType
      userAvatarFilename?: string
    }
  }
}

const appOptions: AppOptions = {
  port: serverConfig.port,
  hostname: serverConfig.hostname,
  publicPath: serverConfig.publicDirname,
  routers: [
    AuthRouter.init(),
    UserRouter.init(),
    SettingsRouter.init(),
  ],
  middlewares: [
    cookieParser(),
    bodyParser.json(),
  ],
};

App.init(appOptions).listen();
