import { Reducer, AnyAction, combineReducers, createStore, Store as ReduxStore } from 'redux';
import { Stores } from '../constants';

export let reduxStore: ReduxStore;

export let storeService: StoreService;

export class StoreService {
  private reducers: { [key: string]: Reducer<any, AnyAction> } = {};
  private combinedReducers: Reducer<any, AnyAction> = combineReducers({});
  private deletedStoreNames: Array<string> = [];

  constructor() {
    reduxStore = createStore((state: any, action: AnyAction) => {
      const updatedState = {...state};
      this.removeDeletedReducersFromState(updatedState);
  
      return this.combinedReducers(updatedState, action);
    });
  }

  static createStore(): ReduxStore {
    storeService = new StoreService();
    return reduxStore;
  }

  hasReducer(storeName: Stores): boolean {
    return storeName in this.reducers;
  }

  addReducer(storeName: Stores, storeReducer: Reducer<any, AnyAction>): void {
    this.reducers[storeName] = storeReducer;
    this.updateCombinedReducers();
  }

  deleteReducer(storeName: Stores): void {
    delete this.reducers[storeName];
    this.deletedStoreNames.push(storeName);
    this.updateCombinedReducers();
  }

  private removeDeletedReducersFromState(state: any) {
    this.deletedStoreNames.forEach((deletedReducerName) => {
      delete state[deletedReducerName];
    });

    this.deletedStoreNames = [];
  }

  private updateCombinedReducers() {
    this.combinedReducers = combineReducers(this.reducers);
    reduxStore.dispatch({type: ''});
  }
}
