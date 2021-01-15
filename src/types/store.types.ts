import { Stores } from '../constants';
import { AuthStore } from './auth.types';
import { LanguageStore } from './language.types';
import { UserInputsStore } from './user-inputs.types';
import { UserStore } from './user.types';

export type Store = UserInputsStore | LanguageStore | AuthStore | UserStore;

export interface StoreManager {
  getStore(storeName: Stores): Store;
  addStore(storeName: Stores): Promise<void>;
  deleteStore(storeName: Stores): void;
};
