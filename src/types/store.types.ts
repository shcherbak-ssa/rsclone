import { Reducer, AnyAction } from 'redux';
import { Stores } from "../constants";

export type StoreSelectors = {
  [key: string]: (state: any) => any | Function;
};

export type StoreActions = {
  [key: string]: Function;
};

export type StoreGetters = {
  [key: string]: Function;
};

export type Store = {
  selectors: StoreSelectors;
  actions: StoreActions;
  getters?: StoreGetters,
};

export type StoreCreator = {
  store: Store;
  storeName: Stores;
  storeReducer: Reducer<any, AnyAction>;
};

export interface StoreController {
  addStore(storeCreator: StoreCreator): void;
  deleteStore(storeName: Stores): void
};

export interface StoreGetter {
  getStoreSelectors(storeName: Stores): StoreSelectors;
  getStoreActions(storeName: Stores): StoreActions;
  getStoreetters(storeName: Stores): StoreGetters
};
