import { AppRoutePathnames, Stores, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';
import { User, UsersUrlPathname } from '../types/user.types';
import { ClientError } from '../services/errors.service';
import { AppRoutesService } from '../services/app-routes.service';
import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { AppRoutes, Request, RequestCreator, RequestSender, Response } from '../types/services.types';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { UrlPathnameService } from '../services/url-pathname.service';

export class AppModel {
  async initApp(): Promise<string | null> {
    try {
      const requestSender: RequestSender = new RequestSenderService();
      const request: Request = this.createUserRequest();
      const response: Response = await requestSender.send(request).get();

      const user: User = response.parseResponse();
      // @TODO: init user.store;

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
    const usersUrlPathname: UsersUrlPathname = new UrlPathnameService();
    const usersPathname: string = usersUrlPathname.getUsersPathname();
    const requestCreator: RequestCreator = new RequestCreatorService();

    return requestCreator
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
