import { Reducer, AnyAction, combineReducers, createStore, Store as ReduxStore } from 'redux';
import { Stores } from '../constants';

export type Store = {
  selectors: { [key: string]: (state: any) => any };
  actions: { [key: string]: Function };
};

export interface StoreCreator {
  getStoreName(): Stores;
  getReducer(): Reducer<any, AnyAction>;
  getStore(): Store;
};

export let storeService: StoreService;

export class StoreService {
  store: ReduxStore;
  private stores: Map<Stores, Store> = new Map();
  private reducers: { [key: string]: Reducer<any, AnyAction> } = {};
  private combinedReducers: Reducer<any, AnyAction> = combineReducers({});
  private deletedStoreNames: Array<string> = [];

  constructor() {
    this.store = createStore(this.reduce.bind(this));
  }

  static createStore() {
    storeService = new StoreService();
    return storeService.store;
  }

  reduce(state: any, action: AnyAction) {
    const updatedState = {...state};
    this.removeDeletedReducersFromState(updatedState);

    return this.combinedReducers(updatedState, action);
  }

  getStoreSelectors(storeName: Stores) {
    return this.getStore(storeName).selectors;
  }

  getStoreActions(storeName: Stores) {
    return this.getStore(storeName).actions;
  }

  addStore(storeCreator: StoreCreator) {
    const storeName: Stores = storeCreator.getStoreName();

    if (this.reducers[storeName]) return;

    this.reducers[storeName] = storeCreator.getReducer();
    this.stores.set(storeName, storeCreator.getStore());

    this.updateCombinedReducers();
  }

  deleteStore(storeName: Stores) {
    if (!storeName || !this.reducers[storeName]) return;

    delete this.reducers[storeName];
    this.stores.delete(storeName);

    this.deletedStoreNames.push(storeName);
    this.updateCombinedReducers();
  }

  dispatchAction(action: AnyAction) {
    this.store.dispatch(action);
  }

  private getStore(storeName: Stores) {
    return this.stores.get(storeName);
  }

  private removeDeletedReducersFromState(state: any) {
    this.deletedStoreNames.forEach((deletedReducerName) => {
      delete state[deletedReducerName];
    });

    this.deletedStoreNames = [];
  }

  private updateCombinedReducers() {
    this.combinedReducers = combineReducers(this.reducers);
    this.dispatchAction({type: ''});
  }
}
