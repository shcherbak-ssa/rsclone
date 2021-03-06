export const AVATAR_LABEL: string = 'avatar';

export enum RequestPathnames {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  USERS = '/@:username/users',
  AVATARS = '/@:username/avatars',
  SPACES = '/@:username/spaces',
  PAGES = '/@:username/s/:spacePathname',
};

export enum MiddlewarePathnames {
  ENTRY = '*',
  CONTROLLER = '*',
  AUTH_USER = '/@:username',
  LANGUAGES = '/languages/:language',
  AVATARS = '/@:username/avatars',
  ACTIVE_SPACE = '/@:username/s/:spacePathname',
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
};

export enum ErrorLabels {
  EMPTY_VALUE = 'empty-value',
  INVALID_EMAIL = 'invalid-email',
  EMAIL_EXIST = 'email-exist',
  USERNAME_EXIST = 'username-exist',
  PASSWORD_MIN = 'password-length',
  ALPHA_NUMERIC = 'alpha-numeric',
  FIELD_MAX = 'field-max',
  INVALID_USER = 'invalid-user',
  INVALID_FILE_TYPE = 'invalid-file-type',
  NEW_PASSWORD_REQUIRED = 'new-password-required',
  PASSWORD_REQUIRED = 'password-required',
  INVALID_PASSWORD = 'invalid-password',
};

export enum SpaceColors {
  GREEN = '26CB7C',
  BLUE = '03D1EB',
  DARK_BLUE = '3884FF',
  PURPLE = 'A44EED',
  RED = 'FF4642',
  ORANGE = 'F77D05',
  YELLOW = 'FFD139',
};

export enum PageDataLabels {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  NODES = 'nodes',
};

export enum UserDataLabels {
  AVATAR = 'avatar',
  FULLNAME = 'fullname',
  EMAIL = 'email',
  PASSWORD = 'password',
  NEW_PASSWORD = 'newPassword',
  USERNAME = 'username',
  LANGUAGE = 'language',
  THEME = 'theme',
  SHORTCUTS = 'shortcuts',
  SPACE_ID = 'id',
  SPACE_NAME = 'name',
  SPACE_COLOR = 'color',
  SPACE_LOGO = 'logo',
  SPACE_PATHNAME = 'pathname',
  SPACE_PAGES = 'pages',
  SPACE_LAST_UPDATED = 'lastUpdated',
  PAGE_ID = 'id',
  PAGE_TITLE = 'title',
  PAGE_DESCRIPTION = 'description',
  PAGE_PATHNAME = 'pathname',
  PAGE_CONTENT = 'content',
};
