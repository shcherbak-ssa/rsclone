import { AnyAction } from "redux";
import cloneDeep from "clone-deep";

import { Stores, UserDataLabels } from "../constants";
import { Store, StoreCreator, storeService } from "../services/store.service";

enum Constants {
  UPDATE_INPUT_VALUE = 'user-inputs-store/update-input-value',
  SET_INPUT_ERROR = 'user-inputs-store/set-input-error',
  RESET_STATES = 'user-inputs-store/reset-states',
  ADD_INPUTS = 'user-inputs-store/add-inputs',
};

/** types */
type UserInputState = {
  value: string;
  error: string;
};

type UserInputsStoreState = {
  [key: string]: UserInputState;
};

type UserInputsStoreSelectorState = {
  [Stores.USER_INPUTS_STORE]: UserInputsStoreState
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE;
  payload: {
    updatedInput: { [key: string]: UserInputState; };
  };
};

type SetInputErrorAction = {
  type: Constants.SET_INPUT_ERROR;
  payload: {
    error: string;
    inputLabel: UserDataLabels;
  };
};

type ResetStatesAction = {
  type: Constants.RESET_STATES;
  payload: {
    resetedState: UserInputsStoreState;
  };
};

type AddInputsAction = {
  type: Constants.ADD_INPUTS;
  payload: {
    inputs: { [key: string]: UserInputState },
  };
};

type UserInputsStoreAction = 
  AnyAction |
  UpdateInputValueAction |
  SetInputErrorAction |
  ResetStatesAction |
  AddInputsAction;

/** constants */
const initialInputState = () => ({value: '', error: ''});
const dispatchAction = storeService.dispatchAction.bind(storeService);

const initialState: UserInputsStoreState = {
  [UserDataLabels.FULLNAME]: initialInputState(),
  [UserDataLabels.EMAIL]: initialInputState(),
  [UserDataLabels.PASSWORD]: initialInputState(),
};

const userInputsStore: Store = {
  selectors: {
    getInputState: (inputLabel: UserDataLabels) => {
      return (state: UserInputsStoreSelectorState) => {
        return state[inputLabel];
      };
    },
  },
  actions: {
    updateInputValue: (value: string, inputLabel: UserDataLabels) => {
      dispatchAction(
        updateInputValueAction(value, inputLabel)
      );
    },
    setInputError: (error: string, inputLabel: UserDataLabels) => {
      dispatchAction(
        setInputErrorAction(error, inputLabel)
      );
    },
    resetStates: () => {
      dispatchAction(
        resetStatesAction(storeService.getStates()[Stores.USER_INPUTS_STORE])
      );
    },
    addInputs: (inputNames: UserDataLabels[]) => {
      dispatchAction(
        addInputsAction(inputNames)
      );
    },
  },
};

/** store creator */
export const userInputsStoreCreator: StoreCreator = {
  store: userInputsStore,
  storeName: Stores.USER_INPUTS_STORE,
  storeReducer: userInputsStoreReducer,
}

/** reducer */
function userInputsStoreReducer(
  state: UserInputsStoreState = initialState, {type, payload}: UserInputsStoreAction,
): UserInputsStoreState {
  switch (type) {
    case Constants.UPDATE_INPUT_VALUE:
      return {...state, ...payload.updatedInput};
    case Constants.SET_INPUT_ERROR:
      const {inputLabel, error} = payload, {value} = state[inputLabel];
      return {...state, [inputLabel]: { value, error }};
    case Constants.RESET_STATES:
      return payload.payload.resetedState;
    case Constants.ADD_INPUTS:
      return {...state, ...payload.inputs};
    default:
      return state;
  }
}

/** actions */
function updateInputValueAction(
  value: string, inputLabel: UserDataLabels,
): UpdateInputValueAction {
  return {
    type: Constants.UPDATE_INPUT_VALUE,
    payload: {
      updatedInput: {
        [inputLabel]: { value, error: '' },
      },
    },
  };
}

function setInputErrorAction(
  error: string, inputLabel: UserDataLabels,
): SetInputErrorAction {
  return {
    type: Constants.SET_INPUT_ERROR,
    payload: { error, inputLabel },
  };
}

function resetStatesAction(state: UserInputsStoreState): ResetStatesAction {
  const clonedState = cloneDeep(state);

  for (const inputLabel of Object.keys(clonedState)) {
    clonedState[inputLabel] = initialInputState();
  }

  return {
    type: Constants.RESET_STATES,
    payload: { resetedState: clonedState }
  };
}

function addInputsAction(inputNames: UserDataLabels[]): AddInputsAction {
  const inputs = {};

  for (const inputName of inputNames) {
    inputs[inputName] = initialInputState();
  }

  return {
    type: Constants.ADD_INPUTS,
    payload: { inputs },
  };
}
