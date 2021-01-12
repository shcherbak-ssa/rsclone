import { Stores } from '../constants';
import {
  Store, StoreActions, StoreGetter, StoreGetters, StoreSelectors,
} from '../types/store.types';

export class StoresGetterService implements StoreGetter {
  protected stores: Map<Stores, Store> = new Map();

  getStoreSelectors(storeName: Stores): StoreSelectors {
    return this.getStore(storeName).selectors;
  }

  getStoreActions(storeName: Stores): StoreActions {
    return this.getStore(storeName).actions;
  }

  getStoreGetters(storeName: Stores): StoreGetters {
    return this.getStore(storeName).getters;
  }

  private getStore(storeName: Stores) {
    return this.stores.get(storeName);
  }
}
