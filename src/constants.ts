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
  INIT_REGISTRATION = 'app-events/init-registration',
  INIT_LOGIN = 'app-events/init-login',
  REMOVE_INIT_EVENTS = 'app-events/remove-init-events',
};
