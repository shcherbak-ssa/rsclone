import { AnyAction } from 'redux';

import { Stores } from '../constants';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { reduxStore } from '../services/store.service';
import { ActiveSpaceStore, ActiveSpaceStoreState, initialState } from '../types/active-space.types';

enum Constants {
  SET_IS_OPEN = 'active-space-store/set-is-open',
};

/** types */
type ActiveSpaceStoreSelector = {
  [Stores.ACTIVE_SPACE_STORE]: ActiveSpaceStoreState
};

type SetIsOpenAction = {
  type: Constants.SET_IS_OPEN,
  payload: {
    isOpen: boolean,
  },
};

type ActiveSpaceStoreAction = AnyAction | SetIsOpenAction;

/** constants */
const activeSpaceStoreSelectors: StoreSelectors = {
  getIsOpen: () => {
    return (state: ActiveSpaceStoreSelector) => {
      return state[Stores.ACTIVE_SPACE_STORE].isOpen;
    };
  },
};

class ActiveSpaceStoreImpl implements ActiveSpaceStore {
  setIsOpen(isOpen: boolean): void {
    reduxStore.dispatch(
      setIsOpenAction(isOpen)
    );
  }
}

/** store creator */
export const activeSpaceStoreCreator: StoreCreator = {
  store: new ActiveSpaceStoreImpl(),
  storeSelectors: activeSpaceStoreSelectors,
  storeReducer: activeSpaceStoreReducer,
};

/** recuder */
function activeSpaceStoreReducer(
  state: ActiveSpaceStoreState = initialState, {type, payload}: ActiveSpaceStoreAction
): ActiveSpaceStoreState {
  switch (type) {
    case Constants.SET_IS_OPEN:
      return {...state, isOpen: payload.isOpen};
    default:
      return state;
  }
}

/** actions */
function setIsOpenAction(isOpen: boolean): SetIsOpenAction {
  return {
    type: Constants.SET_IS_OPEN,
    payload: { isOpen },
  };
}
