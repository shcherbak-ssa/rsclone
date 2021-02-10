import { Reducer, AnyAction } from 'redux';
import { Stores } from '../constants';
import { Store, StoreManager } from '../types/store.types';
import { StoreLoaderService } from './store-loader.service';
import { StoreSelectors, storeSelectorsService } from './store-selectors.service';
import { storeService } from './store.service';

const stores: Map<Stores, Store> = new Map();

export type StoreCreator = {
  store: Store;
  storeSelectors: StoreSelectors;
  storeReducer: Reducer<any, AnyAction>;
};

export class StoreManagerService implements StoreManager {
  private storeLoader: StoreLoaderService;

  constructor() {
    this.storeLoader = new StoreLoaderService();
  }

  getStore(storeName: Stores): Store {
    return stores.get(storeName);
  }

  async addStore(storeName: Stores): Promise<void> {
    if (storeService.hasReducer(storeName)) return;

    const storeCreator: StoreCreator = await this.storeLoader.loadStore(storeName);
    const {store, storeSelectors, storeReducer} = storeCreator;

    stores.set(storeName, store);
    storeSelectorsService.set(storeName, storeSelectors);
    storeService.addReducer(storeName, storeReducer);
  }

  deleteStore(storeName: Stores): void {
    if (!storeName || !storeService.hasReducer(storeName)) return;

    stores.delete(storeName);
    storeSelectorsService.delete(storeName);
    storeService.deleteReducer(storeName);
  }
}
