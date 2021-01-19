export enum AppEvents {
  INIT_APP = 'app-events/init-app',
  INIT_AUTHORIZATION = 'app-events/init-authorization',
  REMOVE_INIT_EVENTS = 'app-events/remove-init-events',
};

export enum UserDraftEvents {
  INIT_EVENTS = 'user-draft-events/init-events',
  REMOVE_EVENTS = 'user-draft-events/remove-events',
  UPDATE_VALUE = 'user-draft-events/update-value',
  SET_ERROR = 'user-draft-events/set-error',
  RESET_STATES = 'user-draft-events/reset-states',
};

export enum LanguageEvents {
  CHANGE_LANGUAGE = 'language-events/change-language',
  ADD_PARTS = 'language-events/add-parts',
};

export enum AuthEvents {
  INIT_REGISTRATION = 'auth-events/init-registraion',
  INIT_LOGIN = 'auth-events/init-login',
  REMOVE_ERROR = 'auth-events/remove-error',
};

export enum UserEvents {
  UPDATE_STATES = 'user-events/update-states',
  SYNC_DRAFT = 'user-events/sync-draft',
  DELETE_USER = 'user-events/delete-user',
  UPDATE_USER = 'user-events/update-user',
};

export enum AvatarEvents {
  CHANGE_AVATAR = 'avatar-events/change-avatar',
};

export enum SpacesEvents {
  CREATE_SPACE = 'spaces-events/create-space',
};
