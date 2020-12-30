import { InputLabels } from '../constants';

enum Constants {
  UPDATE_VALUE = 'inputs-store/update-value',
  UPDATE_ERROR = 'inputs-store/update-error',
  UPDATE_STATE = 'inputs-store/update-state',
};

type InputLabelType =
  typeof InputLabels.NAME_INPUT_LABEL |
  typeof InputLabels.EMAIL_INPUT_LABEL |
  typeof InputLabels.PASSWORD_INPUT_LABEL;

type UpdateValueActionType = {
  type: typeof Constants.UPDATE_VALUE,
  value: string,
  inputLabel: InputLabelType,
};

type UpdateErrorActionType = {
  type: typeof Constants.UPDATE_ERROR,
  error: string,
  inputLabel: InputLabelType,
};

type UpdateStateActionType = {
  type: typeof Constants.UPDATE_STATE,
};

export type InputsActionType =
  UpdateValueActionType | UpdateErrorActionType | UpdateStateActionType;

type InputState = {
  value: string,
  error: string,
  inputLabel: InputLabelType,
};

export type InputsStateType = {
  [InputLabels.NAME_INPUT_LABEL]: InputState,
  [InputLabels.EMAIL_INPUT_LABEL]: InputState,
  [InputLabels.PASSWORD_INPUT_LABEL]: InputState,
};

const initialState: InputsStateType = {
  [InputLabels.NAME_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: InputLabels.NAME_INPUT_LABEL,
  },
  [InputLabels.EMAIL_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: InputLabels.EMAIL_INPUT_LABEL,
  },
  [InputLabels.PASSWORD_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: InputLabels.PASSWORD_INPUT_LABEL,
  },
}

function inputsReducer(
  state: InputsStateType = initialState,
  action: InputsActionType,
): InputsStateType {
  let input: InputState;

  switch (action.type) {
    case Constants.UPDATE_VALUE:
      input = state[action.inputLabel];
      return {
        ...state,
        [action.inputLabel]: {
          value: action.value,
          error: input.error,
          inputLabel: input.inputLabel,
        }
      };
    case Constants.UPDATE_ERROR:
      input = state[action.inputLabel];
      return {
        ...state,
        [action.inputLabel]: {
          error: action.error,
          value: input.value,
          inputLabel: input.inputLabel,
        }
      };
    case Constants.UPDATE_STATE:
      return initialState;
    default:
      return state;
  }
}

function updateValue(
  value: string, inputLabel: InputLabelType,
): UpdateValueActionType {
  return {
    type: Constants.UPDATE_VALUE, value, inputLabel,
  };
}

function updateError(
  error: string, inputLabel: InputLabelType,
): UpdateErrorActionType {
  return {
    type: Constants.UPDATE_ERROR, error, inputLabel,
  };
}

function updateState(): UpdateStateActionType {
  return {
    type: Constants.UPDATE_STATE,
  };
}

export const inputsStore = {
  reducer: inputsReducer,
  actions: {
    updateValue,
    updateError,
    updateState
  },
};
