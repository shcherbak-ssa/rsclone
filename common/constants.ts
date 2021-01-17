export enum RequestPathnames {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  USERS = '/@:username/users',
};

export enum MiddlewarePathnames {
  ENTRY = '*',
  CONTROLLER = '*',
  AUTH_USER = `/@:username`,
  LANGUAGES = '/languages/:language',
};

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
};

export enum RequestHeaders {
  AUTHORIZATION = 'Authorization',
  CONTENT_TYPE = 'Content-Type',
  REQUEST_FROM_CODE = 'request-from-code',
};

export enum StatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
};

export enum ErrorNames {
  CLIENT_ERROR = 'ClientError',
  SERVER_ERROR = 'ServerError',
  VALIDATION_ERROR = 'ValidationError',
};

export enum LanguageLabels {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  ITALIAN = 'it',
}

export enum LanguageParts {
  APP = 'app',
  AUTH = 'auth',
  USER_DRAFT = 'user-draft',
  ASSETS = 'assets',
}

export enum Themes {
  ORIGINAL = 'original-theme',
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
};

export enum ShortcurtsSections {
  HOMEPAGE = 'homepage',
  SPACE = 'space'
};

export enum ShortcutsLabels {
  ADD_SPACE = 'add-space',
  ADD_PAGE = 'add-page',
  ADD_SECTION = 'add-section',
};

export enum ErrorLabels {
  EMPTY_VALUE = 'empty-value',
  INVALID_EMAIL = 'invalid-email',
  EMAIL_EXIST = 'email-exist',
  PASSWORD_MIN = 'password-length',
  FULLNAME = 'fullname',
  USERNAME = 'username',
  FIELD_MAX = 'field-max',
  INVALID_USER = 'invalid-user',
};
