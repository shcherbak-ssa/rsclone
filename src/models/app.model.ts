import { AppRoutePathnames, Stores, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';
import { GetUser } from '../types/user.types';
import { ClientError } from '../services/errors.service';
import { AppRoutesService } from '../services/app-routes.service';
import { AppRoutes, Request, Response } from '../types/services.types';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { UserModel } from './user.model';
import { BaseModel } from './base.model';

export class AppModel extends BaseModel {
  async initApp(): Promise<string | null> {
    try {
      const request: Request = this.createUserRequest();
      const response: Response = await this.requestSender.send(request).get();

      const user: GetUser = response.parseResponse();
      const userModel: UserModel = new UserModel();

      await userModel.initUserData(user.user);
      // @TODO: init user.spaces;

      return this.getAppInitialRoutePathname();
    } catch (error) {
      if (error instanceof ClientError) {
        console.log(error.message);
      } else {
        console.log(error);
      }

      return null;
    }
  }

  async initAuthorization(): Promise<string> {
    const storeManager: StoreManager = new StoreManagerService();
    await storeManager.addStore(Stores.AUTH_STORE);

    return this.getAuthorizationInitialRoutePathname();
  }

  private createUserRequest(): Request {
    const usersPathname: string = this.getUsersPathname();

    return this.requestCreator
      .appendUrlPathname(usersPathname)
      .createRequest();
  }

  private getAppInitialRoutePathname(): string {
    if (location.pathname.startsWith(USERNAME_PATHNAME_INITIAL_STRING)) {
      return location.pathname;
    } else {
      const appRoutes: AppRoutes = new AppRoutesService();
      return appRoutes.getRootRoutePath();
    }
  }

  private getAuthorizationInitialRoutePathname(): string {
    switch (location.pathname) {
      case AppRoutePathnames.LOGIN:
      case AppRoutePathnames.REGISTRATION:
        return location.pathname;
      default:
        return AppRoutePathnames.LOGIN;
    }
  }
}
