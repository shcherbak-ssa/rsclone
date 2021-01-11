export enum RequestHeaders {
  AUTHORIZATION = 'Authorization',
  CONTENT_TYPE = 'Content-Type',
  REQUEST_FROM_CODE = 'request-from-code',
};

export enum RequestPathnames {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  USERS = '/users',
};

export enum StatusCodes {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
};

export enum ErrorNames {
  CLIENT_ERROR = 'ClientError',
  SERVER_ERROR = 'ServerError',
};