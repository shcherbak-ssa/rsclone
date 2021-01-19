import { AnyAction } from 'redux';

import { Space } from '../../common/entities';
import { Stores } from '../constants';
import { StoreCreator } from '../services/store-manager.service';
import { StoreSelectors } from '../services/store-selectors.service';
import { reduxStore } from '../services/store.service';
import { initialState, SpacesStore, SpacesStoreState } from '../types/spaces.types';

enum Constants {
  SET_SPACES = 'spaces-store/set-spaces',
  ADD_SPACE = 'spaces-store/add-space',
};

/** types */
type SpacesStoreSelector = {
  [Stores.SPACES_STORE]: SpacesStoreState,
};

type SetSpacesAction = {
  type: Constants.SET_SPACES,
  payload: {
    spaces: Space[],
  },
};

type AddSpaceAction = {
  type: Constants.ADD_SPACE,
  payload: {
    space: Space,
  },
};

type SpacesStoreAction = AnyAction | SetSpacesAction | AddSpaceAction;

/** constants */
const spacesStoreSelectors: StoreSelectors = {
  getSpaces: () => {
    return (state: SpacesStoreSelector) => {
      return state[Stores.SPACES_STORE];
    };
  },
};

class SpacesStoreImpl implements SpacesStore {
  setSpaces(spaces: Space[]): void {
    reduxStore.dispatch(
      setSpacesAction(spaces)
    );
  }

  addSpace(space: Space): void {
    reduxStore.dispatch(
      addSpaceAction(space)
    );
  }
}

/** store creator */
export const spacesStoreCreator: StoreCreator = {
  store: new SpacesStoreImpl(),
  storeSelectors: spacesStoreSelectors,
  storeReducer: spacesStoreReducer,
};

/** reducer */
function spacesStoreReducer(
  state: SpacesStoreState = initialState, {type, payload}: SpacesStoreAction
): SpacesStoreState {
  switch (type) {
    case Constants.SET_SPACES:
      return payload.spaces
    case Constants.ADD_SPACE:
      return [...state, payload.space];
    default:
      return state;
  }
}

/** actions */
function setSpacesAction(spaces: Space[]): SetSpacesAction {
  return {
    type: Constants.SET_SPACES,
    payload: { spaces },
  };
}

function addSpaceAction(space: Space): AddSpaceAction {
  return {
    type: Constants.ADD_SPACE,
    payload: { space },
  };
}
