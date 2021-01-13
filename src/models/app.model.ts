import { RequestPathnames } from '../../common/constants';
import { AppRoutePathnames, Stores, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';
import { User } from '../types/user.types';
import { RequestModel } from './request.model';
import { ResponseModel } from './response.model';
import { ClientError } from './errors.model';
import { AppRoutesService } from '../services/app-routes.service';
import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { AppRoutes, RequestCreator, RequestSender } from '../types/services.types';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';

export class AppModel {
  async initApp(): Promise<string | null> {
    try {
      const requestModel: RequestModel = this.createUserRequest();
      const requestSender: RequestSender = new RequestSenderService();
      const responseModel: ResponseModel = await requestSender.send(requestModel).get();

      const user: User = responseModel.parseResponse();
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
    // const storeManager: StoreManager = new StoreManagerService();
    // await storeManager.addStore(Stores.AUTH_STORE);

    return this.getAuthorizationInitialRoutePathname();
  }

  private createUserRequest(): RequestModel {
    const requestCreator: RequestCreator = new RequestCreatorService();
    requestCreator.setFullUrl(RequestPathnames.USERS);

    return requestCreator.createRequest();
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
