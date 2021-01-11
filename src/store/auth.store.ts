import { AnyAction } from 'redux';

import { Stores } from '../constants';
import { StoreCreator, Store, storeService } from '../services/store.service';

enum Constants {
  SET_AUTH_ERROR = 'auth-store/set-auth-error',
  REMOVE_AUTH_ERROR = 'auth-store/remove-auth-error',
};

type AuthStoreState = {
  authError: string;
};

type AuthStoreSelectorState = { [Stores.AUTH_STORE]: AuthStoreState };

type SetAuthErrorAction = {
  type: Constants.SET_AUTH_ERROR;
  payload: {
    error: string;
  };
};

type RemoveAuthErrorAction = {
  type: Constants.REMOVE_AUTH_ERROR;
  payload: {};
};

type AuthStoreAction = AnyAction | SetAuthErrorAction | RemoveAuthErrorAction;

const initialState: AuthStoreState = {
  authError: '',
};

const authStore: Store = {
  selectors: {
    getAuthError: (state: AuthStoreSelectorState) => {
      return state[Stores.AUTH_STORE].authError;
    },
  },
  actions: {
    setAuthError: (error: string) => {
      storeService.dispatchAction(
        setAuthErrorAction(error)
      );
    },
    removeAuthError: () => {
      storeService.dispatchAction(
        removeAuthErrorAction()
      );
    },
  },
}

export class AuthStoreCreator implements StoreCreator {
  getStoreName() {
    return Stores.AUTH_STORE;
  }

  getReducer() {
    return authStoreReducer;
  }

  getStore() {
    return authStore;
  }
}

function authStoreReducer(
  state: AuthStoreState = initialState, {type, payload}: AuthStoreAction,
): AuthStoreState {
  switch (type) {
    case Constants.SET_AUTH_ERROR:
      return { authError: payload.error };
    case Constants.REMOVE_AUTH_ERROR:
      return initialState;
    default:
      return state;
  }
}

function setAuthErrorAction(error: string): SetAuthErrorAction {
  return {
    type: Constants.SET_AUTH_ERROR,
    payload: { error },
  };
}

function removeAuthErrorAction(): RemoveAuthErrorAction {
  return {
    type: Constants.REMOVE_AUTH_ERROR,
    payload: {},
  };
}
