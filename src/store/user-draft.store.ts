import { AnyAction } from "redux";

import {
  UserDraftStore,
  UserDraftState,
  UpdatedDraft,
  UserDraftStoreState,
  initialState,
  InputState,
  ActiveSpace,
} from "../types/user-draft.types";
import { Stores, UserDataLabels } from "../constants";
import { reduxStore } from "../services/store.service";
import { StoreCreator } from "../services/store-manager.service";
import { StoreSelectors } from "../services/store-selectors.service";

enum Constants {
  UPDATE_VALUE = 'user-draft-store/update-value',
  SET_ERROR = 'user-draft-store/set-error',
  RESET_STATES = 'user-draft-store/reset-states',
  SET_ACTIVE_SPACE = 'user-draft-store/set-active-space',
};

/** types */
type UserDraftStoreSelector = {
  [Stores.USER_DRAFT_STORE]: UserDraftStoreState,
};

type UpdateValueAction = {
  type: Constants.UPDATE_VALUE,
  payload: {
    updatedDraft: UpdatedDraft,
  };
};

type SetErrorAction = {
  type: Constants.SET_ERROR,
  payload: {
    updatedDraft: UpdatedDraft,
  };
};

type ResetStatesAction = {
  type: Constants.RESET_STATES,
  payload: {
    resetedStates: UserDraftStoreState,
  },
};

type SetActiveSpaceAction = {
  type: Constants.SET_ACTIVE_SPACE,
  payload: {
    activeSpace: ActiveSpace,
  },
};

type UserDraftStoreAction =
  | AnyAction
  | UpdateValueAction
  | SetErrorAction
  | ResetStatesAction
  | SetActiveSpaceAction;

/** constants */
const isInput = (inputState: UserDraftState): boolean => {
  return typeof inputState === 'object' && !Array.isArray(inputState);
};

const userDraftStoreSelectors: StoreSelectors = {
  getState: (dataLabel: UserDataLabels) => {
    return (state: UserDraftStoreSelector) => {
      return state[Stores.USER_DRAFT_STORE][dataLabel];
    };
  },
  getStoreStates: (requestedDataLabels: UserDataLabels[]) => {
    return (state: UserDraftStoreSelector) => {
      const storeStates: UserDraftStoreState = state[Stores.USER_DRAFT_STORE];
      const requestedResult = requestedDataLabels
        .map((dataLabel) => {
          const currentState = storeStates[dataLabel];
          const returnedValue = isInput(currentState)
            ? (currentState as InputState).value : currentState;

          return [dataLabel, returnedValue];
        });

      return new Map(requestedResult as Iterable<[string, string | boolean]>);
    };
  },
};

class UserDraftStoreImpl implements UserDraftStore {
  getDraftState(dataLabel: UserDataLabels): UserDraftState {
    return this.getUserInputsStore(dataLabel);
  }

  getDraftValues(dataLabels: UserDataLabels[]): UserDraftStoreState {
    const inputValues = {};

    dataLabels.forEach((dataLabel) => {
      const inputState: UserDraftState = this.getUserInputsStore(dataLabel);
      inputValues[dataLabel] = isInput(inputState) ? (inputState as InputState).value : inputState;
    });

    return inputValues;
  }

  updateValue(updatedDraft: UpdatedDraft): void {
    reduxStore.dispatch(
      updateValueAction(updatedDraft)
    );
  }

  setError(updatedDraft: UpdatedDraft): void {
    reduxStore.dispatch(
      setErrorAction(updatedDraft)
    );
  }

  resetStates(resetedStates: UserDraftStoreState): void {
    reduxStore.dispatch(
      resetStatesAction(resetedStates)
    );
  }

  setActiveSpace(activeSpace: ActiveSpace): void {
    reduxStore.dispatch(
      setActiveSpaceAction(activeSpace)
    );
  }

  private getUserInputsStore(dataLabel: UserDataLabels) {
    return reduxStore.getState()[Stores.USER_DRAFT_STORE][dataLabel];
  }
}

/** store creator */
export const userDraftStoreCreator: StoreCreator = {
  store: new UserDraftStoreImpl(),
  storeSelectors: userDraftStoreSelectors,
  storeReducer: userInputsStoreReducer,
}

/** reducer */
function userInputsStoreReducer(
  state: UserDraftStoreState = initialState, {type, payload}: UserDraftStoreAction,
): UserDraftStoreState {
  switch (type) {
    case Constants.UPDATE_VALUE:
      return {...state, ...payload.updatedDraft};
    case Constants.SET_ERROR:
      return {...state, ...payload.updatedDraft};
    case Constants.RESET_STATES:
      return {...state, ...payload.resetedStates};
    case Constants.SET_ACTIVE_SPACE:
      return {...state, ...payload.activeSpace};
    default:
      return state;
  }
}

/** actions */
function updateValueAction(updatedDraft: UpdatedDraft): UpdateValueAction {
  return {
    type: Constants.UPDATE_VALUE,
    payload: { updatedDraft },
  };
}

function setErrorAction(updatedDraft: UpdatedDraft): SetErrorAction {
  return {
    type: Constants.SET_ERROR,
    payload: { updatedDraft },
  };
}

function resetStatesAction(resetedStates: UserDraftStoreState): ResetStatesAction {
  return {
    type: Constants.RESET_STATES,
    payload: { resetedStates },
  };
}

function setActiveSpaceAction(activeSpace: ActiveSpace): SetActiveSpaceAction {
  return {
    type: Constants.SET_ACTIVE_SPACE,
    payload: { activeSpace },
  };
}
