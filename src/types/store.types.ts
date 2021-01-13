import { Stores } from '../constants';
import { LanguageStore } from './language.types';
import { UserInputsStore } from './user-inputs.types';

export type Store = UserInputsStore | LanguageStore;

export interface StoreManager {
  getStore(storeName: Stores): Store;
  addStore(storeName: Stores): Promise<void>;
  deleteStore(storeName: Stores): void;
};
