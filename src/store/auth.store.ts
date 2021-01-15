import { AnyAction } from "redux";
import { LanguageLabels, Themes } from "../../common/constants";
import { Stores } from "../constants";
import { StoreCreator } from "../services/store-manager.service";
import { StoreSelectors } from "../services/store-selectors.service";
import { reduxStore } from "../services/store.service";
import { AuthStore, AuthStoreState, AuthUserData, initialState } from "../types/auth.types";

enum Constants {
  SET_AUTH_ERROR = 'auth-store/set-auth-error',
  UPDATE_THEME = 'auth-store/update-theme',
  UPDATE_LANGUAGE = 'auth-store/update-language',
}

/** types */
type AuthStoreSelectorState = {
  [Stores.AUTH_STORE]: AuthStoreState;
};

type SetAuthErrorAction = {
  type: Constants.SET_AUTH_ERROR,
  payload: { authError: string },
};

type UpdateThemeAction = {
  type: Constants.UPDATE_THEME,
  payload: { theme: Themes },
};

type UpdateLanguageAction = {
  type: Constants.UPDATE_LANGUAGE,
  payload: { language: LanguageLabels },
};

type AuthStoreAction = AnyAction | SetAuthErrorAction | UpdateThemeAction | UpdateLanguageAction;

/** constants */
const authStoreSelectors: StoreSelectors = {
  getAuthError: () => {
    return (state: AuthStoreSelectorState) => {
      return state[Stores.AUTH_STORE].authError;
    };
  },
  getThemeState: () => {
    return (state: AuthStoreSelectorState) => {
      return state[Stores.AUTH_STORE].theme;
    };
  },
  getLanguageState: () => {
    return (state: AuthStoreSelectorState) => {
      return state[Stores.AUTH_STORE].language;
    };
  },
};

class AuthStoreImpl implements AuthStore {
  getAuthUserData(): AuthUserData {
    const {theme, language} = reduxStore.getState()[Stores.AUTH_STORE];
    return {theme, language};
  }
  
  setAuthError(authError: string): void {
    reduxStore.dispatch(
      setAuthErrorAction(authError)
    );
  }

  updateTheme(theme: Themes): void {
    reduxStore.dispatch(
      updateThemeAction(theme)
    );
  }

  updateLanguage(language: LanguageLabels): void {
    reduxStore.dispatch(
      updateLanguageAction(language)
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
    case Constants.UPDATE_THEME:
      return {...state, theme: payload.theme};
    case Constants.UPDATE_LANGUAGE:
      return {...state, language: payload.language};
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

function updateThemeAction(theme: Themes): UpdateThemeAction {
  return {
    type: Constants.UPDATE_THEME, payload: { theme },
  };
}

function updateLanguageAction(language: LanguageLabels): UpdateLanguageAction {
  return {
    type: Constants.UPDATE_LANGUAGE, payload: { language },
  };
}
