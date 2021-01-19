import bodyParser from 'body-parser';
import serverConfig from '../config/server.config.json';

import { DatabaseConnectionService } from './services/database-connection.service';
import { UsersCollectionDatabase } from './database/users-collection.database';
import { ControllerData } from './types/controller.types';
import { EntryMiddleware } from './middlewares/entry.middleware';
import { AuthUserMiddleware } from './middlewares/auth-user.middleware';
import { LanguageMiddleware } from './middlewares/language.middleware';
import { ControllerMiddleware } from './middlewares/controller.middleware';
import { AvatarsMiddleware } from './middlewares/avatars.middleware';
import { AuthRouter } from './routers/auth.router';
import { UsersRouter } from './routers/users.router';
import { AvatarsRouter } from './routers/avatars.router';
import { SpacesRouter } from './routers/spaces.router';
import { App, AppOptions } from './app';
import { UserFilesService } from './services/user-files.service';
import { AvatarFile } from './models/avatars.model';


declare global {
  namespace Express {
    interface Request {
      userID?: string;
      controllerData?: ControllerData;
      avatarFile?: AvatarFile;
    }
  }
}

DatabaseConnectionService.init().connect()
  .then(() => {
    UsersCollectionDatabase.create();
  })
  .then(() => {
    return UserFilesService.init();
  })
  .then(() => {
    const appOptions: AppOptions = {
      port: serverConfig.app.port,
      hostname: serverConfig.app.hostname,
      routers: [
        new AuthRouter(),
        new UsersRouter(),
        new AvatarsRouter(),
        new SpacesRouter(),
      ],
      middlewares: [
        bodyParser.json(),
      ],
      appMiddlewares: [
        new EntryMiddleware(),
        new AuthUserMiddleware(),
        new AvatarsMiddleware(),
        new ControllerMiddleware(),
        new LanguageMiddleware(),
      ],
    };

    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
