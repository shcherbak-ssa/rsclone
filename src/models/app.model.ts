import { RequestPathnames, StatusCodes } from '../../common/constants';
import { AppEvents, AppRoutePathnames, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';
import { User } from '../types/user.types';
import { AppRoutes } from '../types/app-routers.types';
import { RequestData } from '../data/request.data';
import { ResponseData } from '../data/response.data';
import { ClientError, ServerError } from '../data/errors.data';
import { appController } from '../controllers/app.controller';
import { AppRoutesService } from '../services/app-routes.service';
import { RequestCreator } from '../services/request-creator.service';
import { RequestService } from '../services/request.service';
import { storeService } from '../services/store.service';

export class AppModel {
  async initApp(renderAppCallback: (initialRoutePathname: string) => void): Promise<void> {
    try {
      const requestData: RequestData = this.createUserRequest();
      const responseData: ResponseData = await RequestService.get(requestData).sendRequest();

      const user: User = this.parseResponse(responseData);
      // @TODO: init user.store;

      const appInitialRoutePathname: string = this.getAppInitialRoutePathname();
      renderAppCallback(appInitialRoutePathname);
    } catch (error) {
      if (error instanceof ClientError) {
        appController.emit(AppEvents.INIT_AUTHORIZATION, renderAppCallback);
      } else {
        console.log(error);
      }
    }
  }

  async initAuthorization(renderAppCallback: (initialRoutePathname: string) => void): Promise<void> {
    const {authStoreCreator} = await import('../store/auth.store');
    storeService.addStore(authStoreCreator);

    const authorizationInitialRoutePathname: string = this.getAuthorizationInitialRoutePathname();
    renderAppCallback(authorizationInitialRoutePathname);
  }

  private createUserRequest(): RequestData {
    const requestCreator: RequestCreator = new RequestCreator();
    requestCreator.setFullUrl(RequestPathnames.USERS);

    return requestCreator.createRequest();
  }

  private parseResponse(responseData: ResponseData): User {
    if (responseData.isSuccessStatusCode()) {
      return responseData.getPayload() as User;
    } else {
      const statusCode: number = responseData.getStatusCode();
      const {message, ...payload} = responseData.getPayload();

      if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        throw new ServerError(message, payload);
      } else {
        throw new ClientError(message, payload);
      }
    }
  }

  private getAppInitialRoutePathname(): string {
    if (location.pathname.startsWith(USERNAME_PATHNAME_INITIAL_STRING)) {
      return location.pathname;
    } else {
      const appRoutesService: AppRoutes = new AppRoutesService();
      return appRoutesService.getRootRoutePath();
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
