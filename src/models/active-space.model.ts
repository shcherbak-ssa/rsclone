import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { ActiveSpaceStore } from '../types/active-space.types';
import { StoreManager } from '../types/store.types';

export class ActiveSpaceModel {
  private activeSpaceStore: ActiveSpaceStore;

  constructor() {
    const storeManager: StoreManager = new StoreManagerService();
    this.activeSpaceStore = storeManager.getStore(Stores.ACTIVE_SPACE_STORE) as ActiveSpaceStore;
  }
  
  async setIsOpen(isOpen: boolean): Promise<void> {
    this.activeSpaceStore.setIsOpen(isOpen);
  }
}
