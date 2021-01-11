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
  REMOVE_INIT_EVENTS = 'app-events/remove-init-events',
};

export enum UserInputsEvents {
  INIT_EVENTS = 'user-inputs-events/init-events',
  REMOVE_EVENTS = 'user-inputs-events/remove-events',
  UPDATE_INPUT_VALUE = 'user-inputs-events/update-input-value',
  SET_INPUT_ERROR = 'user-inputs-events/set-input-error',
  RESET_STATES = 'user-inputs-events/reset-states',
  ADD_INPUTS = 'user-inputs-events/add-inputs',
};

export enum AppRoutePathnames {
  ROOT = '/',
  SPACES = '/spaces',
  SETTINGS = '/settings',
  REGISTRATION = '/registration',
  LOGIN = '/login',
};

export enum Classnames {
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

export enum UserDataLabels {
  AVATAR = 'avatar',
  FULLNAME = 'fullname',
  EMAIL = 'email',
  PASSWORD = 'password',
  USERNAME = 'username',
  LANGUAGE = 'language',
  THEME = 'theme',
  SHORTCUTS = 'shortcuts',
};

export enum Stores {
  AUTH_STORE = 'auth-store',
  USER_INPUTS_STORE = 'user-inputs-store',
};
