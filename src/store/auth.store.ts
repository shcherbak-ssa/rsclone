import { AnyAction } from "redux";
import { Stores, UserDataLabels } from "../constants";
import { StoreCreator } from "../services/store-manager.service";
import { StoreSelectors } from "../services/store-selectors.service";
import { reduxStore } from "../services/store.service";
import { AuthStore, AuthStoreState, AuthUserStoreState, initialState, UpdatedAuthUserData } from "../types/auth.types";

enum Constants {
  SET_AUTH_ERROR = 'auth-store/set-auth-error',
  UPDATE_USER_DATA = 'auth-store/update-user-data',
}

/** types */
type AuthStoreSelectorState = {
  [Stores.AUTH_STORE]: AuthStoreState;
};

type SetAuthErrorAction = {
  type: Constants.SET_AUTH_ERROR,
  payload: { authError: string },
};

type UpdateUserDataAction = {
  type: Constants.UPDATE_USER_DATA,
  payload: { updatedData: UpdatedAuthUserData },
};

type AuthStoreAction = AnyAction | SetAuthErrorAction | UpdateUserDataAction;

/** constants */
const authStoreSelectors: StoreSelectors = {
  getStoreStates: (requestedDataLabels: UserDataLabels[]) => {
    return (state: AuthStoreSelectorState) => {
      const storeStates: AuthStoreState = state[Stores.AUTH_STORE];
      const requestedResult = requestedDataLabels.map((dataLabel) => {
        return [dataLabel, storeStates[dataLabel]];
      });

      return new Map(requestedResult as Iterable<[string, string | boolean]>);
    };
  },
};

class AuthStoreImpl implements AuthStore {
  getRegistrationData(): AuthUserStoreState {
    return this.getAuthUserStoreState();
  }
  
  getLoginData(): AuthUserStoreState {
    return this.getAuthUserStoreState();
  }
  
  setAuthError(authError: string): void {
    reduxStore.dispatch(
      setAuthErrorAction(authError)
    );
  }

  updateUserData(updatedData: UpdatedAuthUserData): void {
    reduxStore.dispatch(
      updateUserDataAction(updatedData)
    );
  }

  private getAuthUserStoreState(): AuthUserStoreState {
    return reduxStore.getState()[Stores.AUTH_STORE].user;
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
    case Constants.UPDATE_USER_DATA:
      return {...state, user: {...state.user, ...payload.updatedData}};
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

function updateUserDataAction(updatedData: UpdatedAuthUserData): UpdateUserDataAction {
  return {
    type: Constants.UPDATE_USER_DATA, payload: { updatedData },
  };
}
