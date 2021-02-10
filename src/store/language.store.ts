import { AnyAction } from 'redux';

import { Stores } from '../constants';
import { reduxStore } from '../services/store.service';
import { LanguageStoreState, initialState, LanguageStore } from '../types/language.types';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { LanguageParts } from '../../common/constants';

enum Constants {
  CHANGE_LANGUAGE = 'language-store/change-language',
  ADD_PARTS = 'language-store/add-parts',
}

/** types */
type LanguageStoreSelectorState = {
  [Stores.LANGUAGE_STORE]: LanguageStoreState;
};

type ChangeLanguageAction = {
  type: Constants.CHANGE_LANGUAGE,
  payload: { changedLanguage: LanguageStoreState },
};

type AddPartsAction = {
  type: Constants.ADD_PARTS,
  payload: {
    newParts: LanguageStoreState;
  };
};

type LanguageStoreAction = AnyAction | AddPartsAction | ChangeLanguageAction;

/** constants */
const langaugeStoreSelectors: StoreSelectors = {
  getLanguagePart(languagePart: LanguageParts) {
    return (state: LanguageStoreSelectorState) => {
      return state[Stores.LANGUAGE_STORE][languagePart];
    };
  } 
};

class LanguageStoreImpl implements LanguageStore {
  getParts(): LanguageParts[] {
    return Object.keys(reduxStore.getState()[Stores.LANGUAGE_STORE]) as LanguageParts[];
  }

  changeLanguage(changedLanguage: LanguageStoreState): void {
    reduxStore.dispatch(
      changeLanguageAction(changedLanguage)
    );
  }

  addParts(updatedLanguage: LanguageStoreState) {
    reduxStore.dispatch(
      addPartsAction(updatedLanguage)
    );
  }
}

/** store creator */
export const languageStoreCreator: StoreCreator = {
  store: new LanguageStoreImpl(),
  storeSelectors: langaugeStoreSelectors,
  storeReducer: languageStoreReducer,
}

/** reducer */
function languageStoreReducer(
  state: LanguageStoreState = initialState, {type, payload}: LanguageStoreAction
): LanguageStoreState {
  switch (type) {
    case Constants.CHANGE_LANGUAGE:
      return payload.changedLanguage;
    case Constants.ADD_PARTS:
      return {...state, ...payload.newParts};
    default:
      return state;
  }
}

/** actions */
function changeLanguageAction(changedLanguage: LanguageStoreState): ChangeLanguageAction {
  return {
    type: Constants.CHANGE_LANGUAGE,
    payload: { changedLanguage },
  };
}

function addPartsAction(updatedLanguage: LanguageStoreState): AddPartsAction {
  return {
    type: Constants.ADD_PARTS,
    payload: { newParts: updatedLanguage },
  };
}
