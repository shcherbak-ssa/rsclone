export const USER_LOCALSTORAGE_KEY: string = 'user';
export const USERNAME_PATHNAME_INITIAL_STRING: string = '/@';

export const EMPTY_VALUE_LENGTH: number = 0;

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
  ROOT = '/',
  SPACES = '/spaces',
  SETTINGS = '/settings',
  REGUSTRATION = '/registration',
  LOGIN = '/login',
};

export enum Classnames {
  IS_LOGIN_MODE = 'is-login-mode',
  IS_ERROR = 'is-error',
  IS_SELECTED = 'is-selected',
  IS_ACTIVE = 'is-active',
  IS_OPEN = 'is-open',
  HAS_DESCRIPTION = 'has-description',
};

export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
};
