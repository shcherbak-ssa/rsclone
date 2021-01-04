import { combineReducers, createStore, Store } from 'redux';

import { AppActionType, AppStateType, appStore } from './app.store';

export type StoreStateType = {
  app: AppStateType,
};

type StoreActionType = AppActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  app: appStore.reducer,
}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
