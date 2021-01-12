import { Reducer, AnyAction, combineReducers, createStore, Store as ReduxStore } from 'redux';

import { Stores } from '../constants';
import { StoreCreator, StoreController } from '../types/store.types';
import { StoresGetterService } from './stores-getter.service';

export let storeService: StoreService;

export class StoreService extends StoresGetterService implements StoreController {
  store: ReduxStore;

  private reducers: { [key: string]: Reducer<any, AnyAction> } = {};
  private combinedReducers: Reducer<any, AnyAction> = combineReducers({});
  private deletedStoreNames: Array<string> = [];

  constructor() {
    super();
    this.store = createStore(this.reduce.bind(this));
  }

  static createStore(): ReduxStore {
    storeService = new StoreService();
    return storeService.store;
  }

  reduce(state: any, action: AnyAction) {
    const updatedState = {...state};
    this.removeDeletedReducersFromState(updatedState);

    return this.combinedReducers(updatedState, action);
  }

  addStore({store, storeName, storeReducer}: StoreCreator) {
    if (this.reducers[storeName]) return;

    this.stores.set(storeName, store);
    this.addReducer(storeName, storeReducer);

    this.updateCombinedReducers();
  }

  deleteStore(storeName: Stores) {
    if (!storeName || !this.reducers[storeName]) return;

    this.stores.delete(storeName);
    this.deleteReducer(storeName);

    this.deletedStoreNames.push(storeName);
    this.updateCombinedReducers();
  }

  getStates(): any {
    return this.store.getState();
  }

  dispatchAction(action: AnyAction) {
    this.store.dispatch(action);
  }

  private addReducer(storeName: Stores, storeReducer: Reducer<any, AnyAction>) {
    this.reducers[storeName] = storeReducer;
  }

  private deleteReducer(storeName: Stores) {
    delete this.reducers[storeName];
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
