import { RequestPathnames, StatusCodes } from '../../common/constants';
import { AppEvents, AppRoutePathnames, USERNAME_PATHNAME_INITIAL_STRING } from '../constants';

import { User } from '../types/user.types';
import { RequestCreator } from '../data/request.data';
import { ResponseData } from '../data/response.data';
import { ClientError, ServerError } from '../data/errors.data';

import { appController } from '../controllers/app.controller';
import { AppRoutesService } from '../services/app-routes.service';
import { RequestService } from '../services/request.service';
import { storeService } from '../services/store.service';

export class AppModel {
  async initApp(renderAppCallback: (initialRoutePathname: string) => void) {
    try {
      const requestData = this.createUserRequest();
      const responseData = await RequestService.get(requestData).sendRequest();

      const user: User = this.parseResponse(responseData);
      // @TODO: init user.store;

      const appInitialRoutePathname = this.getAppInitialRoutePathname();
      renderAppCallback(appInitialRoutePathname);
    } catch (error) {
      if (error instanceof ClientError) {
        appController.emit(AppEvents.INIT_AUTHORIZATION, renderAppCallback);
      } else {
        console.log(error);
      }
    }
  }

  async initAuthorization(renderAppCallback: (initialRoutePathname: string) => void) {
    const { AuthStoreCreator } = await import('../store/auth.store');
    storeService.addStore(new AuthStoreCreator());

    const authorizationInitialRoutePathname = this.getAuthorizationInitialRoutePathname();
    renderAppCallback(authorizationInitialRoutePathname);
  }

  private createUserRequest() {
    const requestCreator = new RequestCreator();
    requestCreator.setFullUrl(RequestPathnames.USERS);

    return requestCreator.createRequest();
  }

  private parseResponse(responseData: ResponseData) {
    if (responseData.isSuccessStatusCode()) {
      return responseData.getPayload() as User;
    } else {
      const statusCode = responseData.getStatusCode();
      const {message, ...payload} = responseData.getPayload();

      if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        throw new ServerError(message, payload);
      } else {
        throw new ClientError(message, payload);
      }
    }
  }

  private getAppInitialRoutePathname() {
    if (location.pathname.startsWith(USERNAME_PATHNAME_INITIAL_STRING)) {
      return location.pathname;
    } else {
      const appRoutesService = new AppRoutesService();
      return appRoutesService.getRootRoutePath();
    }
  }

  private getAuthorizationInitialRoutePathname() {
    switch (location.pathname) {
      case AppRoutePathnames.LOGIN:
      case AppRoutePathnames.REGISTRATION:
        return location.pathname;
      default:
        return AppRoutePathnames.LOGIN;
    }
  }
}
