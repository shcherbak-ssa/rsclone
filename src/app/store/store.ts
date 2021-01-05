import { combineReducers, createStore, Store } from 'redux';

import { UserActionType, UserStateType, userStore } from './user.store';

export type StoreStateType = {
  user: UserStateType,
};

type StoreActionType = UserActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  user: userStore.reducer,
}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
