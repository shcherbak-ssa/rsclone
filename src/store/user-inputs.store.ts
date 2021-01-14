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
import { LanguageLabels, Themes } from "../../common/constants";

enum Constants {
  UPDATE_INPUT_VALUE = 'user-inputs-store/update-input-value',
  SET_INPUT_ERROR = 'user-inputs-store/set-input-error',
  CHANGE_LANGUAGE = 'user-inputs-store/change-language',
  CHANGE_THEME = 'user-inputs-store/change-theme',
  RESET_STATES = 'user-inputs-store/reset-states',
};

/** types */
type UserInputsStoreSelectorState = {
  [Stores.USER_INPUTS_STORE]: UserInputsStoreState,
};

type UpdateInputValueAction = {
  type: Constants.UPDATE_INPUT_VALUE,
  payload: {
    updatedInput: UpdatedInput,
  };
};

type SetInputErrorAction = {
  type: Constants.SET_INPUT_ERROR,
  payload: {
    updatedInput: UpdatedInput,
  };
};

type ChangeLanguageAction = {
  type: Constants.CHANGE_LANGUAGE,
  payload: {
    language: LanguageLabels,
  },
};

type ChangeThemeAction = {
  type: Constants.CHANGE_THEME,
  payload: {
    theme: Themes,
  },
};

type ResetStatesAction = {
  type: Constants.RESET_STATES,
  payload: {
    resetedStates: UserInputsStoreState,
  },
};

type UserInputsStoreAction =
  | AnyAction
  | UpdateInputValueAction
  | SetInputErrorAction
  | ChangeLanguageAction
  | ChangeThemeAction
  | ResetStatesAction;

/** constants */
const userInputsStoreSelectors: StoreSelectors = {
  getState: (dataLabel: UserDataLabels) => {
    return (state: UserInputsStoreSelectorState) => {
      return state[Stores.USER_INPUTS_STORE][dataLabel];
    };
  },
  getStoreStates: (requestedDataLabels: UserDataLabels[]) => {
    return (state: UserInputsStoreSelectorState) => {
      const storeStates: UserInputsStoreState = state[Stores.USER_INPUTS_STORE];
      const requestedResult = requestedDataLabels.map((dataLabel) => {
        const currentState = storeStates[dataLabel];
        const returnedValue = typeof currentState === 'object' ? currentState.value : currentState;

        return [dataLabel, returnedValue];
      });

      return new Map(requestedResult as Iterable<[string, string | boolean]>);
    };
  },
};

class UserInputsStoreImpl implements UserInputsStore {
  getInputStates(dataLabel: UserDataLabels): UserInputState {
    return this.getUserInputsStore()[dataLabel];
  }

  getLanguage(): LanguageLabels {
    return this.getUserInputsStore()[UserDataLabels.LANGUAGE];
  }

  getTheme(): Themes {
    return this.getUserInputsStore()[UserDataLabels.THEME];
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

  changeLanguage(nextLanguage: LanguageLabels): void {
    reduxStore.dispatch(
      changeLanguageAction(nextLanguage)
    );
  }

  changeTheme(nextTheme: Themes): void {
    reduxStore.dispatch(
      changeThemeAction(nextTheme)
    );
  }

  resetStates(resetedStates: UserInputsStoreState): void {
    reduxStore.dispatch(
      resetStatesAction(resetedStates)
    );
  }

  private getUserInputsStore() {
    return reduxStore.getState()[Stores.USER_INPUTS_STORE];
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
    case Constants.CHANGE_LANGUAGE:
      const {language} = payload;
      return {...state, language};
    case Constants.CHANGE_THEME:
      const {theme} = payload;
      return {...state, theme};
    case Constants.RESET_STATES:
      return {...state, ...payload.resetedStates};
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

function changeLanguageAction(language: LanguageLabels): ChangeLanguageAction {
  return {
    type: Constants.CHANGE_LANGUAGE,
    payload: { language },
  };
}

function changeThemeAction(theme: Themes): ChangeThemeAction {
  return {
    type: Constants.CHANGE_THEME,
    payload: { theme },
  };
}

function resetStatesAction(resetedStates: UserInputsStoreState): ResetStatesAction {
  return {
    type: Constants.RESET_STATES,
    payload: { resetedStates },
  };
}
