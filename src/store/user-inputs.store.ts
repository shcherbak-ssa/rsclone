import { AnyAction } from "redux";

import { Stores, UserDataLabels } from "../constants";
import {
  UserInputsStore,
  UserInputState,
  UpdatedInput,
  UserInputsStoreState,
  initialState,
} from "../types/user-inputs.types";
import { reduxStore } from "../services/store.service";
import { StoreCreator } from "../services/store-manager.service";
import { StoreSelectors } from "../services/store-selectors.service";

enum Constants {
  UPDATE_INPUT_VALUE = 'user-inputs-store/update-input-value',
  SET_INPUT_ERROR = 'user-inputs-store/set-input-error',
  RESET_STATES = 'user-inputs-store/reset-states',
};

/** types */
type UserInputsStoreSelectorState = {
  [Stores.USER_INPUTS_STORE]: UserInputsStoreState;
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE;
  payload: {
    updatedInput: UpdatedInput;
  };
};

type SetInputErrorAction = {
  type: Constants.SET_INPUT_ERROR;
  payload: {
    updatedInput: UpdatedInput;
  };
};

type ResetStatesAction = {
  type: Constants.RESET_STATES;
  payload: {};
};

type UserInputsStoreAction = AnyAction | UpdateInputValueAction | SetInputErrorAction | ResetStatesAction;

/** constants */
const userInputsStoreSelectors: StoreSelectors = {
  getInputStates: (dataLabel: UserDataLabels) => {
    return (state: UserInputsStoreSelectorState) => {
      return state[Stores.USER_INPUTS_STORE][dataLabel];
    };
  }
};

class UserInputsStoreImpl implements UserInputsStore {
  getInputStates(dataLabel: UserDataLabels): UserInputState {
    return reduxStore.getState()[Stores.USER_INPUTS_STORE][dataLabel];
  }

  updateInputValue(updatedInput: UpdatedInput): void {
    reduxStore.dispatch(
      updateInputValueAction(updatedInput)
    );
  }

  setInputError(updatedInput: UpdatedInput): void {
    reduxStore.dispatch(
      setInputErrorAction(updatedInput)
    );
  }

  resetStates(): void {
    reduxStore.dispatch(
      resetStatesAction()
    );
  }
}

/** store creator */
export const userInputsStoreCreator: StoreCreator = {
  store: new UserInputsStoreImpl(),
  storeSelectors: userInputsStoreSelectors,
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
      return {...state, ...payload.updatedInput};
    case Constants.RESET_STATES:
      return initialState;
    default:
      return state;
  }
}

/** actions */
function updateInputValueAction(updatedInput: UpdatedInput): UpdateInputValueAction {
  return {
    type: Constants.UPDATE_INPUT_VALUE,
    payload: { updatedInput },
  };
}

function setInputErrorAction(updatedInput: UpdatedInput): SetInputErrorAction {
  return {
    type: Constants.SET_INPUT_ERROR,
    payload: { updatedInput },
  };
}

function resetStatesAction(): ResetStatesAction {
  return {
    type: Constants.RESET_STATES,
    payload: {}
  };
}
