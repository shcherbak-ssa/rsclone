import { Router } from 'express';

import { BaseRouter } from './base.router';
import { UsernameParam } from '../params/username.param';
import { SettingsModel } from '../models/settings.model';
import { AvatarService } from '../services/avatar.service';

const SETTINGS_PATHNAME: string = '/@:username/settings';

export class SettingsRouter implements BaseRouter {
  router: Router = Router();
  avatarService: AvatarService = new AvatarService();

  static init(): SettingsRouter {
    return new SettingsRouter();
  }

  initRouter() {
    UsernameParam.init(this.router);

    this.router
      .post(
        SETTINGS_PATHNAME,  
        this.avatarService.createMiddleware(),
        SettingsModel.loadUserAvatar,
      )
      .post(
        SETTINGS_PATHNAME,
        SettingsModel.confirmPassword,
      )
      .put(
        SETTINGS_PATHNAME,
        SettingsModel.updateUserData,
      );
  }
}
