import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { DatabaseConnectionService } from './services/database-connection.service';
import { UsersCollectionDatabase } from './database/users-collection.database';
import { ControllerData } from './types/controller.types';
import { EntryMiddleware } from './middlewares/entry.middleware';
import { AuthUserMiddleware } from './middlewares/auth-user.middleware';
import { LanguageMiddleware } from './middlewares/language.middleware';
import { ControllerMiddleware } from './middlewares/controller.middleware';
import { AvatarsMiddleware } from './middlewares/avatars.middleware';
import { ActiveSpaceMiddleware } from './middlewares/active-space.middleware';
import { AuthRouter } from './routers/auth.router';
import { UsersRouter } from './routers/users.router';
import { AvatarsRouter } from './routers/avatars.router';
import { SpacesRouter } from './routers/spaces.router';
import { PagesRouter } from './routers/pages.router';
import { App, AppOptions } from './app';
import { UserFilesService } from './services/user-files.service';
import { AvatarFile } from './models/avatars.model';
import { DEFAULT_PORT } from './constants';

declare global {
  namespace Express {
    interface Request {
      userID?: string;
      controllerData?: ControllerData;
      avatarFile?: AvatarFile;
    }
  }
}

dotenv.config();

DatabaseConnectionService.init().connect()
  .then(() => {
    UsersCollectionDatabase.create();
  })
  .then(() => {
    UserFilesService.init();
  })
  .then(() => {
    const appOptions: AppOptions = {
      port: process.env.PORT || DEFAULT_PORT,
      routers: [
        new AuthRouter(),
        new UsersRouter(),
        new AvatarsRouter(),
        new SpacesRouter(),
        new PagesRouter(),
      ],
      middlewares: [
        bodyParser.json(),
      ],
      appMiddlewares: [
        new EntryMiddleware(),
        new AuthUserMiddleware(),
        new AvatarsMiddleware(),
        new ControllerMiddleware(),
        new ActiveSpaceMiddleware(),
        new LanguageMiddleware(),
      ],
    };

    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
