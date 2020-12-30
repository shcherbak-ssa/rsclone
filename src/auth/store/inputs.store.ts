import { InputLabels } from '../constants';

enum Constants {
  UPDATE_VALUE = 'inputs-store/update-value',
  UPDATE_ERROR = 'inputs-store/update-error',
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

export type InputsActionType = UpdateValueActionType | UpdateErrorActionType;

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
  switch (action.type) {
    case Constants.UPDATE_VALUE:
      return {
        ...state,
        [action.inputLabel]: {
          value: action.value
        }
      };
    case Constants.UPDATE_ERROR:
      return {
        ...state,
        [action.inputLabel]: {
          error: action.error
        }
      };
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

export const inputsStore = {
  reducer: inputsReducer,
  actions: {
    updateValue,
    updateError,
  },
};
