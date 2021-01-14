export const INDEX_FILENAME: string = 'index.html';
export const ASSETS_EXTNAME_REGEXP: RegExp = /^\.(js|css|png|svg|ico)$/;

export enum DatabaseNames {
  USERS = 'users',
};

export enum UsersDatabaseCollectionNames {
  USERS = 'users',
};

export enum Parameters {
  USERNAME = 'username',
  LANGUAGE = 'language',
};

export enum AuthRouterPathnames {
  REGISTRATION = 'auth/registration',
  LOGIN = 'auth/login',
};
