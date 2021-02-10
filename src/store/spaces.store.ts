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
  UPDATE_SPACES = 'spaces-store/update-spaces',
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

type UpdateSpacesAction = {
  type: Constants.UPDATE_SPACES,
  payload: {
    updatedSpaces: Space[],
  },
};

type SpacesStoreAction = AnyAction | SetSpacesAction | AddSpaceAction | UpdateSpacesAction;

/** constants */
const spacesStoreSelectors: StoreSelectors = {
  getSpaces: () => {
    return (state: SpacesStoreSelector) => {
      return state[Stores.SPACES_STORE];
    };
  },
};

class SpacesStoreImpl implements SpacesStore {
  getSpaceByPathname(spacePathname: string): Space {
    return this.getSpacesStore().find((space) => space.pathname === spacePathname);
  }

  getSpaces(): Space[] {
    return this.getSpacesStore();
  }

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

  updateSpaces(updatedSpaces: Space[]): void {
    reduxStore.dispatch(
      updateSpacesAction(updatedSpaces)
    );
  }

  private getSpacesStore(): SpacesStoreState {
    return reduxStore.getState()[Stores.SPACES_STORE];
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
    case Constants.UPDATE_SPACES:
      return payload.updatedSpaces;
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

function updateSpacesAction(updatedSpaces: Space[]): UpdateSpacesAction {
  return {
    type: Constants.UPDATE_SPACES,
    payload: { updatedSpaces },
  };
}
