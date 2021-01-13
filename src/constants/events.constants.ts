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
  CHANGE_LANGUAGE = 'user-inputs-events/change-language',
  CHANGE_THEME = 'user-inputs-events/change-theme',
  RESET_STATES = 'user-inputs-events/reset-states',
};

export enum LanguageEvents {
  CHANGE_LANGUAGE = 'language-events/change-language',
  ADD_PARTS = 'language-events/add-parts',
};
