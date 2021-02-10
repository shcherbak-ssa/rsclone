import { AnyAction } from 'redux';

import { Stores } from '../constants';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { reduxStore } from '../services/store.service';
import { AuthStore, AuthStoreState, initialState } from '../types/auth.types';

enum Constants {
  SET_AUTH_ERROR = 'auth-store/set-auth-error',
}

/** types */
type AuthStoreSelector = {
  [Stores.AUTH_STORE]: AuthStoreState;
};

type SetAuthErrorAction = {
  type: Constants.SET_AUTH_ERROR,
  payload: { authError: string },
};

type AuthStoreAction = AnyAction | SetAuthErrorAction;

/** constants */
const authStoreSelectors: StoreSelectors = {
  getAuthError: () => {
    return (state: AuthStoreSelector) => {
      return state[Stores.AUTH_STORE].authError;
    };
  },
};

class AuthStoreImpl implements AuthStore {  
  setAuthError(authError: string): void {
    reduxStore.dispatch(
      setAuthErrorAction(authError)
    );
  }
}

/** store creator */
export const authStoreCreator: StoreCreator = {
  store: new AuthStoreImpl(),
  storeSelectors: authStoreSelectors,
  storeReducer: authStoreReducer,
};

/** reducer */
function authStoreReducer(
  state: AuthStoreState = initialState, {type, payload}: AuthStoreAction
): AuthStoreState {
  switch (type) {
    case Constants.SET_AUTH_ERROR:
      return {...state, authError: payload.authError};
    default:
      return state;
  }
}

/** actions */
function setAuthErrorAction(authError: string): SetAuthErrorAction {
  return {
    type: Constants.SET_AUTH_ERROR, payload: { authError },
  };
}
