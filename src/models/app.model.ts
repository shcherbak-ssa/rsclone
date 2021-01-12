import { RequestPathnames } from '../../common/constants';
import { AppRoutePathnames, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';
import { User } from '../types/user.types';
import { RequestData } from '../data/request.data';
import { ResponseData } from '../data/response.data';
import { ClientError } from '../data/errors.data';
import { AppRoutesService } from '../services/app-routes.service';
import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { storeService } from '../services/store.service';
import { AppRoutes, RequestCreator, RequestSender } from '../types/services.types';

export class AppModel {
  async initApp(): Promise<string | null> {
    try {
      const requestData: RequestData = this.createUserRequest();
      const requestSender: RequestSender = new RequestSenderService();
      const responseData: ResponseData = await requestSender.send(requestData).get();

      const user: User = responseData.parseResponse();
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
    const {authStoreCreator} = await import('../store/auth.store');
    storeService.addStore(authStoreCreator);

    return this.getAuthorizationInitialRoutePathname();
  }

  private createUserRequest(): RequestData {
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
