import cloneDeep from 'clone-deep';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

import { UserDataLabels } from '../constants';
import { storeService } from '../services/store.service';
import { InputsSelectors } from '../types/selectors.types';

enum Constants {
  AUTH_STORE = 'auth-store',
  UPDATE_INPUT_VALUE = 'auth-store/update-input-value',
  SET_INPUT_ERROR = 'auth-store/set-input-error',
  SET_AUTH_ERROR = 'auth-store/set-auth-error',
  REMOVE_AUTH_ERROR = 'auth-store/remove-auth-error',
  RESET_INPUTS_STATES = 'auth-store/reset-inputs-states',
};

type AuthStoreState = {
  formError: string;
  inputs: {
    [UserDataLabels.FULLNAME]: {
      value: string;
      error: string;
    };
  };
};

type SelectorState = { [Constants.AUTH_STORE]: AuthStoreState };

const initialState: AuthStoreState = {
  formError: '',
  inputs: {
    [UserDataLabels.FULLNAME]: {
      value: '',
      error: '',
    },
  },
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE;
  payload: {
    value: string;
    inputLabel: UserDataLabels;
  };
};

type AuthStoreAction = AnyAction | UpdateInputValueAction;

class AuthStoreSelectors implements InputsSelectors {
  getAuthError() {}

  getFullnameInput() {
    return (state: SelectorState) => {
      return state[Constants.AUTH_STORE].inputs[UserDataLabels.FULLNAME];
    };
  }
}

export const authStoreSelectors = new AuthStoreSelectors();

export class AuthStore {
  static storeName: string = Constants.AUTH_STORE;
  static storeReducer: Reducer<AuthStoreState, AuthStoreAction> = authStoreReducer;

  updateInputValue(value: string, inputLabel: UserDataLabels) {
    storeService.dispatchAction(
      updateInputValueAction(value, inputLabel)
    );
  }
}

function authStoreReducer(
  state: AuthStoreState = initialState, {type, payload}: AuthStoreAction,
): AuthStoreState {
  const clonedState = cloneDeep(state);

  switch (type) {
    case Constants.UPDATE_INPUT_VALUE:
      const {value, inputLabel} = payload;
      clonedState.inputs[inputLabel] = {value, error: ''};
      return clonedState;
    default:
      return state;
  }
}

function updateInputValueAction(
  value: string, inputLabel: UserDataLabels,
): UpdateInputValueAction {
  return {
    type: Constants.UPDATE_INPUT_VALUE, payload: { value, inputLabel },
  };
}
