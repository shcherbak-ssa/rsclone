import {
  NAME_INPUT_LABEL,
  EMAIL_INPUT_LABEL,
  PASSWORD_INPUT_LABEL,
} from '../constants';

enum Constants {
  UPDATE_VALUE = 'update-value',
  UPDATE_ERROR = 'update-error',
};

/** types */
type InputLabelType =
  typeof NAME_INPUT_LABEL |
  typeof EMAIL_INPUT_LABEL |
  typeof PASSWORD_INPUT_LABEL;

type InputStateType = {
  value: string,
  error: string,
  inputLabel: InputLabelType,
};

type InputsStateType = {
  [NAME_INPUT_LABEL]: InputStateType,
  [EMAIL_INPUT_LABEL]: InputStateType,
  [PASSWORD_INPUT_LABEL]: InputStateType,
}

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

type InputActionType = UpdateValueActionType | UpdateErrorActionType;

/** state */
const initialState: InputsStateType = {
  [NAME_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: NAME_INPUT_LABEL,
  },
  [EMAIL_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: EMAIL_INPUT_LABEL,
  },
  [PASSWORD_INPUT_LABEL]: {
    value: '',
    error: '',
    inputLabel: PASSWORD_INPUT_LABEL,
  },
}

/** reducer */
function inputsReducer(
  state: InputsStateType = initialState,
  action: InputActionType,
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

/** actions */
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
