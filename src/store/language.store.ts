import { AnyAction } from 'redux';

import { Stores } from '../constants';
import { storeService } from '../services/store.service';
import { Store, StoreCreator } from '../types/store.types';

enum Constants {
  CHANGE_LANGUAGE = 'language-store/change-language',
  ADD_PARTS = 'language-store/add-parts',
}

/** types */
type LanguageStoreState = {
  [key: string]: any;
};

type LanguageStoreSelectorState = {
  [Stores.LANGUAGE_STORE]: LanguageStoreState;
};

type ChangeLanguageAction = {
  type: Constants.CHANGE_LANGUAGE,
  payload: {
    newLanguage: LanguageStoreState;
  };
};

type AddPartsAction = {
  type: Constants.ADD_PARTS,
  payload: {
    newParts: LanguageStoreState;
  };
};

type LanguageStoreAction = AnyAction | ChangeLanguageAction | AddPartsAction;

/** constants */
const initialState: LanguageStoreState = {};
const dispatchAction: Function = storeService.dispatchAction.bind(storeService);

const languageStore: Store = {
  selectors: {
    getLanguagePart: (languagePart: string) => {
      return (state: LanguageStoreSelectorState) => {
        return state[Stores.LANGUAGE_STORE][languagePart];
      };
    },
  },
  actions: {
    changeLanguage: (newLanguage: LanguageStoreState) => {
      dispatchAction(
        changeLanguageAction(newLanguage)
      );
    },
    addParts: (newParts: LanguageStoreState) => {
      dispatchAction(
        addPartsAction(newParts)
      );
    },
  },
  getters: {
    getParts: () => {
      const storeStates: LanguageStoreSelectorState = storeService.getStates();
      const languageStoreStates: LanguageStoreState = storeStates[Stores.LANGUAGE_STORE];
      return Object.keys(languageStoreStates);
    },
  },
}

/** store creator */
export const languageStoreCreator: StoreCreator = {
  store: languageStore,
  storeName: Stores.LANGUAGE_STORE,
  storeReducer: languageStoreReducer,
}

/** reducer */
function languageStoreReducer(
  state: LanguageStoreState = initialState, {type, payload}: LanguageStoreAction
): LanguageStoreState {
  switch (type) {
    case Constants.CHANGE_LANGUAGE:
      return payload.newLanguage;
    case Constants.ADD_PARTS:
      return {...state, ...payload.newParts};
    default:
      return state;
  }
}

/** actions */
function changeLanguageAction(newLanguage: LanguageStoreState): ChangeLanguageAction {
  return {
    type: Constants.CHANGE_LANGUAGE,
    payload: { newLanguage },
  };
}

function addPartsAction(newParts: LanguageStoreState): AddPartsAction {
  return {
    type: Constants.ADD_PARTS,
    payload: { newParts },
  };
}
