import { Space } from '../../common/entities';
import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { SpacesStore } from '../types/spaces.types';
import { StoreManager } from '../types/store.types';
import { BaseModel } from './base.model';

export class SpacesModel extends BaseModel {
  private storeManager: StoreManager;

  constructor() {
    super();
    this.storeManager = new StoreManagerService();
  }

  async setSpaces(spaces: Space[]) {
    await this.storeManager.addStore(Stores.SPACES_STORE);
    this.getSpacesStore().setSpaces(spaces);
  }

  private getSpacesStore(): SpacesStore {
    return this.storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
  }
}
