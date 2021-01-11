export enum RequestPathnames {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  USERS = '/users',
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
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
};

export enum ErrorNames {
  CLIENT_ERROR = 'ClientError',
  SERVER_ERROR = 'ServerError',
};

export enum LanguageLabels {
  ENGLISH = 'en',
  RUSSIAN = 'ru',
  ITALIAN = 'it',
}

export enum LanguageParts {
  AUTH = 'auth',
  USER_INPUTS = 'user-inputs',
}
