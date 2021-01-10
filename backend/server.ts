import { join } from 'path';
import bodyParser from 'body-parser';

import { UserData } from './data/user.data';
import { AuthUserController } from './controllers/auth-user.controller';
import { ConnectionDatabase } from './database/connection.database';
import { App, AppOptions } from './app';

import serverConfig from '../config/server.config.json';
import { usersCollectionDatabase } from './database/users-collection.database';

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
  publicPath: join(process.cwd(), serverConfig.app.publicFolder),
  routers: [],
  middlewares: [
    bodyParser.json(),
  ],
  middlewareControllers: [
    new AuthUserController(),
  ],
};

ConnectionDatabase.init()
  .connect()
  .then((connectionDatabase) => {
    connectionDatabase.createUsersCollection();
  })
  // .then((result) => {
  //   console.log('result', result);
  // })
  .then(() => {
    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
