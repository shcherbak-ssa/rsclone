import { Action, combineReducers, createStore, Store } from 'redux';

export type StoreStateType = {};

type StoreActionType = Action;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
