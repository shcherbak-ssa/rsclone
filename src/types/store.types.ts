import { Stores } from '../constants';
import { ActiveSpaceStore } from './active-space.types';
import { AuthStore } from './auth.types';
import { LanguageStore } from './language.types';
import { SpacesStore } from './spaces.types';
import { UserDraftStore } from './user-draft.types';
import { UserStore } from './user.types';

export type Store =
  | ActiveSpaceStore
  | UserDraftStore
  | LanguageStore
  | AuthStore
  | UserStore
  | SpacesStore;

export interface StoreManager {
  getStore(storeName: Stores): Store;
  addStore(storeName: Stores): Promise<void>;
  deleteStore(storeName: Stores): void;
};
