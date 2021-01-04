import { combineReducers, createStore, Store } from 'redux';

import { AppActionType, AppStateType, appStore } from './app.store';
import { UserActionType, UserStateType, userStore } from './user.store';

export type StoreStateType = {
  app: AppStateType,
  user: UserStateType,
};

type StoreActionType = AppActionType | UserActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  app: appStore.reducer,
  user: userStore.reducer,
}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
