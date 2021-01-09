import { join } from 'path';
import bodyParser from 'body-parser';

import { App, AppOptions } from './app';
import { AuthController } from './controllers/auth.controller';
import { ConnectionDatabase } from './database/connection.database';

import serverConfig from '../config/server.config.json';

declare global {
  namespace Express {
    interface Request {
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
    new AuthController(),
  ],
};

ConnectionDatabase.init()
  .connect()
  .then((connectionDatabase) => {
    connectionDatabase.createUsersCollection();
  })
  .then(() => {
    App.init(appOptions).listen();
  })
  .catch((error) => {
    console.log(error);
  });
