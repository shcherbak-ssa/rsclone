import bodyParser from 'body-parser';

import serverConfig from '../config/server.config.json';
import { ConnectionDatabase } from './database/connection.database';
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
    new EntryMiddleware(),
    new AuthUserMiddleware(),
    new LanguageMiddleware(),
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
