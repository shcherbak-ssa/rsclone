import bodyParser from 'body-parser';

import serverConfig from '../config/server.config.json';
import { DatabaseConnectionService } from './services/database-connection.service';
import { UsersCollectionDatabase } from './database/users-collection.database';
import { ControllerData } from './types/controller.types';
import { EntryMiddleware } from './middlewares/entry.middleware';
import { AuthUserMiddleware } from './middlewares/auth-user.middleware';
import { LanguageMiddleware } from './middlewares/language.middleware';
import { ControllerMiddleware } from './middlewares/controller.middleware';
import { AuthRouter } from './routers/auth.router';
import { App, AppOptions } from './app';


declare global {
  namespace Express {
    interface Request {
      userID?: string;
      controllerData?: ControllerData;
    }
  }
}

DatabaseConnectionService.init().connect()
  .then(() => {
    UsersCollectionDatabase.create();
  })
  .then(() => {
    const appOptions: AppOptions = {
      port: serverConfig.app.port,
      hostname: serverConfig.app.hostname,
      routers: [
        new AuthRouter(),
      ],
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

    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
