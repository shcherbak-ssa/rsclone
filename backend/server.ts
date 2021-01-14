import bodyParser from 'body-parser';

import serverConfig from '../config/server.config.json';
import { DatabaseConnectionService } from './services/database-connection.service';
import { UsersCollectionDatabase } from './database/users-collection.database';
import { App, AppOptions } from './app';
import {
  EntryMiddleware,
  AuthUserMiddleware,
  LanguageMiddleware,
} from './middlewares';


declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}

const appOptions: AppOptions = {
  port: serverConfig.app.port,
  hostname: serverConfig.app.hostname,
  routers: [],
  middlewares: [
    bodyParser.json(),
  ],
  appMiddlewares: [
    new EntryMiddleware(),
    new AuthUserMiddleware(),
    new LanguageMiddleware(),
  ],
};

DatabaseConnectionService.init().connect()
  .then(() => {
    UsersCollectionDatabase.create();
  })
  .then(() => {
    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
