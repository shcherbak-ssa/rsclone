export const USER_LOCALSTORAGE_KEY: string = 'user';
export const USERNAME_PATHNAME_INITIAL_STRING: string = '/@';

export enum DocumentElementIDs {
  ROOT = 'root',
  POPUP = 'popup',
};

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
};

export enum AppEvents {
  INIT_APP = 'app-events/init-app',
  INIT_AUTHORIZATION = 'app-events/init-authorization',
};

export enum AppRoutePathnames {
  REGUSTRATION = '/registration',
  LOGIN = '/login',
};

export enum Classnames {
  IS_LOGIN_MODE = 'is-login-mode',
};
