import { LOGIN_MODE_LABEL, REGISTRATION_MODE_LABEL } from "../constants";

enum Constants {
  TO_REGISTRATION_MODE = 'mode-store/to-registration-mode',
  TO_LOGIN_MODE = 'mode-store/to-login-mode',
};

type ModeType = typeof REGISTRATION_MODE_LABEL | typeof LOGIN_MODE_LABEL;

type ToRegistrationModeActionType = {
  type: typeof Constants.TO_REGISTRATION_MODE,
};

type ToLoginModeActionType = {
  type: typeof Constants.TO_LOGIN_MODE,
};

export type ModeActionType = ToRegistrationModeActionType | ToLoginModeActionType;

export type ModeStateType = {
  currentMode: ModeType,
};

const initialState: ModeStateType = {
  currentMode: REGISTRATION_MODE_LABEL,
};

function modeReducer(
  state: ModeStateType = initialState,
  action: ModeActionType,
): ModeStateType {
  switch (action.type) {
    case Constants.TO_REGISTRATION_MODE:
      return { currentMode: REGISTRATION_MODE_LABEL };
    case Constants.TO_LOGIN_MODE:
      return { currentMode: LOGIN_MODE_LABEL };
    default:
      return state;
  }
}

function switchToRegistrationMode(): ToRegistrationModeActionType {
  return {
    type: Constants.TO_REGISTRATION_MODE,
  };
}

function switchToLoginMode(): ToLoginModeActionType {
  return {
    type: Constants.TO_LOGIN_MODE,
  };
}

export const modeStore = {
  reducer: modeReducer,
  actions: {
    switchToRegistrationMode,
    switchToLoginMode,
  },
};