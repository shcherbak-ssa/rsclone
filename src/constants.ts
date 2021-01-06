const USER_LOCALSTORAGE_LABEL: string = 'user';
const SUCCESS_RESPONSE_TYPE: string = 'success';
const ERROR_RESPONSE_TYPE: string = 'error';

const ROOT_ROUTE_PATH: string = '/';
const APP_INITIAL_ROUTES_STRING: string = '/@';

enum InputLabels {
  NAME_INPUT_LABEL = 'name',
  EMAIL_INPUT_LABEL = 'email',
  PASSWORD_INPUT_LABEL = 'password',
  USERNAME_INPUT_LABEL = 'username',
  LANGUAGE_INPUT_LABEL = 'language',
  THEME_INPUT_LABEL = 'theme',
};

export {
  USER_LOCALSTORAGE_LABEL,
  SUCCESS_RESPONSE_TYPE,
  ERROR_RESPONSE_TYPE,
  APP_INITIAL_ROUTES_STRING,
  ROOT_ROUTE_PATH,
  InputLabels,
};
