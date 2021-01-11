import { AnyAction } from "redux";

import { Stores, UserDataLabels } from "../constants";
import { UserInputState } from "../types/user.types";
import { Store, StoreCreator, storeService } from "../services/store.service";
import { ToolsService } from "../services/tools.service";

enum Constants {
  UPDATE_INPUT_VALUE = 'user-inputs-store/update-input-value',
  SET_INPUT_ERROR = 'user-inputs-store/set-input-error',
  RESET_STATES = 'user-inputs-store/reset-states',
  ADD_INPUTS = 'user-inputs-store/add-inputs',
};

/** types */
type UserInputsStoreState = {
  [key: string]: UserInputState;
};

type UserInputsStoreSelectorState = {
  [Stores.USER_INPUTS_STORE]: UserInputsStoreState
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE;
  payload: {
    updatedInput: {[key: string]: UserInputState};
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
const initialInputState = new ToolsService().getInitialInputState();
const dispatchAction = storeService.dispatchAction.bind(storeService);

const initialState: UserInputsStoreState = {
  [UserDataLabels.FULLNAME]: initialInputState,
  [UserDataLabels.EMAIL]: initialInputState,
  [UserDataLabels.PASSWORD]: initialInputState,
};

const userInputsStore: Store = {
  selectors: {
    getInputState: (inputLabel: UserDataLabels) => {
      return (state: UserInputsStoreSelectorState) => {
        return state[Stores.USER_INPUTS_STORE][inputLabel];
      };
    },
  },
  actions: {
    updateInputValue: (updatedInput: {[key: string]: UserInputState}) => {
      dispatchAction(
        updateInputValueAction(updatedInput)
      );
    },
    setInputError: (error: string, inputLabel: UserDataLabels) => {
      dispatchAction(
        setInputErrorAction(error, inputLabel)
      );
    },
    resetStates: (resetedState: UserInputsStoreState) => {
      dispatchAction(
        resetStatesAction(resetedState)
      );
    },
    addInputs: (inputs: {[key: string]: UserInputState}) => {
      dispatchAction(
        addInputsAction(inputs)
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
      return payload.resetedState;
    case Constants.ADD_INPUTS:
      return {...state, ...payload.inputs};
    default:
      return state;
  }
}

/** actions */
function updateInputValueAction(
  updatedInput: {[key: string]: UserInputState},
): UpdateInputValueAction {
  return {
    type: Constants.UPDATE_INPUT_VALUE,
    payload: { updatedInput },
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

function resetStatesAction(
  resetedState: UserInputsStoreState,
): ResetStatesAction {
  return {
    type: Constants.RESET_STATES,
    payload: { resetedState }
  };
}

function addInputsAction(
  inputs: {[key: string]: UserInputState},
): AddInputsAction {
  return {
    type: Constants.ADD_INPUTS,
    payload: { inputs },
  };
}
