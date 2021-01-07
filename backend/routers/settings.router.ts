import { Router } from 'express';

import { BaseRouter } from './base.router';
import { UsernameParam } from '../params/username.param';
import { SettingsModel } from '../models/settings.model';

enum SettingsPathnames {
  SETTINGS = '/@:username/settings',
};

export class SettingsRouter implements BaseRouter {
  router: Router = Router();

  static init(): SettingsRouter {
    return new SettingsRouter();
  }

  initRouter() {
    UsernameParam.init(this.router);

    this.router
      .post(
        SettingsPathnames.SETTINGS,
        SettingsModel.confirmPassword,
      )
      .put(
        SettingsPathnames.SETTINGS,
        SettingsModel.updateUserData,
      );
  }
}
