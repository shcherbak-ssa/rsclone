import { AnyAction } from 'redux';

import { Stores, UserDataLabels } from '../constants';
import { initialState, UpdatedStates, User, UserDataValue, UserStore } from '../types/user.types';
import { StoreSelectors } from "../services/store-selectors.service";
import { reduxStore } from '../services/store.service';
import { StoreCreator } from '../services/store-manager.service';
import { ShortcutsLabels } from '../../common/constants';
import { Space } from '../../common/entities';

enum Constants {
  UPDATE_STATE = 'user-store/update-state',
  SET_STATES = 'user-store/set-states',
  SET_ACTIVE_SPACE = 'user-store/set-active-space',
};

/** types */
type UserStoreSelector = {
  [Stores.USER_STORE]: User,
};

type UpdateStateAction = {
  type: Constants.UPDATE_STATE,
  payload: {
    updatedStates: UpdatedStates,
  },
};

type SetStatesAction = {
  type: Constants.SET_STATES,
  payload: {
    user: User,
  },
};

type SetActiveSpaceAction = {
  type: Constants.SET_ACTIVE_SPACE,
  payload: {
    activeSpace: Space,
  },
};

type UserStoreAction = AnyAction | UpdateStateAction | SetStatesAction | SetActiveSpaceAction;

/** constants */
const userStoreSelectors: StoreSelectors = {
  getState: (dataLabel: UserDataLabels) => {
    return (state: UserStoreSelector) => {
      return state[Stores.USER_STORE][dataLabel];
    };
  },

  getStoreStates: (dataLabels: UserDataLabels[]) => {
    return (state: UserStoreSelector) => {
      const storeStates: User = state[Stores.USER_STORE];
      const requestedResult = dataLabels.map((dataLabel) => {
        return [dataLabel, storeStates[dataLabel]];
      });

      return new Map(requestedResult as Iterable<[string, string | boolean]>);
    };
  },

  getShortcutKeys: (label: ShortcutsLabels) => {
    return (state: UserStoreSelector) => {
      return state[Stores.USER_STORE][UserDataLabels.SHORTCUTS]
        .find((item) => item.label === label).keys;
    };
  },
};

class UserStoreImpl implements UserStore {
  getState(dataLabel: UserDataLabels): UserDataValue {
    return this.getStates()[dataLabel];
  }

  getStates(): User {
    return reduxStore.getState()[Stores.USER_STORE];
  }

  updateStates(updatedStates: UpdatedStates): void {
    reduxStore.dispatch(
      updateStateAction(updatedStates)
    );
  }

  setStates(user: User): void {
    reduxStore.dispatch(
      setStatesAction(user)
    );
  }

  setActiveSpace(activeSpace: Space): void {
    reduxStore.dispatch(
      setActiveSpaceAction(activeSpace)
    );
  }
}

/** store creator */
export const userStoreCreator: StoreCreator = {
  store: new UserStoreImpl(),
  storeSelectors: userStoreSelectors,
  storeReducer: userStoreReducer,
};

/** reducer */
function userStoreReducer(
  state: User = initialState, {type, payload}: UserStoreAction
): User {
  switch (type) {
    case Constants.UPDATE_STATE:
      return {...state, ...payload.updatedStates};
    case Constants.SET_STATES:
      return {...initialState, ...payload.user};
    case Constants.SET_ACTIVE_SPACE:
      return {...state, ...payload.activeSpace};
    default:
      return state;
  }
}

/** actions */
function updateStateAction(updatedStates: UpdatedStates): UpdateStateAction {
  return {
    type: Constants.UPDATE_STATE,
    payload: { updatedStates },
  };
}

function setStatesAction(user: User): SetStatesAction {
  return {
    type: Constants.SET_STATES,
    payload: { user },
  };
}

function setActiveSpaceAction(activeSpace: Space): SetActiveSpaceAction {
  return {
    type: Constants.SET_ACTIVE_SPACE,
    payload: { activeSpace },
  };
}
