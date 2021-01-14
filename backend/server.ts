import bodyParser from 'body-parser';

import serverConfig from '../config/server.config.json';
import { DatabaseConnectionService } from './services/database-connection.service';
import { UsersCollectionDatabase } from './database/users-collection.database';
import { ControllerData } from './types/controller.types';
import { App, AppOptions } from './app';
import {
  EntryMiddleware,
  AuthUserMiddleware,
  LanguageMiddleware,
  ControllerMiddleware,
} from './middlewares';


declare global {
  namespace Express {
    interface Request {
      username?: string;
      controllerData?: ControllerData;
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
    new ControllerMiddleware(),
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
