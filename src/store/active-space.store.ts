import { AnyAction } from 'redux';

import { Space } from '../../common/entities';
import { Stores } from '../constants';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { reduxStore } from '../services/store.service';
import { ActiveSpaceStore, ActiveSpaceStoreState, initialState } from '../types/active-space.types';

enum Constants {
  SET_ACTIVE_SPACE = 'active-space-store/set-active-space',
  REMOVE_ACTIVE_SPACE = 'active-space-store/remove-active-space',
};

/** types */
type ActiveSpaceStoreSelector = {
  [Stores.ACTIVE_SPACE_STORE]: ActiveSpaceStoreState
};

type SetActiveSpaceAction = {
  type: Constants.SET_ACTIVE_SPACE,
  payload: {
    space: Space,
  },
};

type RemoveActiveSpaceAction = {
  type: Constants.REMOVE_ACTIVE_SPACE,
  payload: {},
};

type ActiveSpaceStoreAction =
  | AnyAction
  | SetActiveSpaceAction
  | RemoveActiveSpaceAction;

/** constants */
const activeSpaceStoreSelectors: StoreSelectors = {
  getIsOpen: () => {
    return (state: ActiveSpaceStoreSelector) => {
      return state[Stores.ACTIVE_SPACE_STORE].isOpen;
    };
  },
};

class ActiveSpaceStoreImpl implements ActiveSpaceStore {
  setActiveSpace(space: Space): void {
    reduxStore.dispatch(
      setActiveSpaceAction(space)
    );
  }

  removeActiveSpace(): void {
    reduxStore.dispatch(
      removeActiveSpaceAction()
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
    case Constants.SET_ACTIVE_SPACE:
      return {...state, isOpen: true, space: payload.space};
    case Constants.REMOVE_ACTIVE_SPACE:
      return {...state, isOpen: false, space: null};
    default:
      return state;
  }
}

/** actions */
function setActiveSpaceAction(space: Space): SetActiveSpaceAction {
  return {
    type: Constants.SET_ACTIVE_SPACE,
    payload: { space },
  };
}

function removeActiveSpaceAction(): RemoveActiveSpaceAction {
  return {
    type: Constants.REMOVE_ACTIVE_SPACE,
    payload: {},
  };
}
