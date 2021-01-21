import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { StoreManager } from '../types/store.types';
import { UpdatedData, User, UserStore } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { UserDraftModel } from './user-draft.model';
import cloneDeep from 'clone-deep';
import { ActiveSpace } from '../types/user-draft.types';
import { Space } from '../../common/entities';

export class UserModel {
  private storeManager: StoreManager;

  constructor() {
    this.storeManager = new StoreManagerService();
  }
  
  async setUser(user: User): Promise<void> {
    await this.storeManager.addStore(Stores.USER_STORE);

    this.getUserStore().setStates(user);
    this.syncDraft();
  }

  updateStates(updatedStates: UpdatedData): void {
    this.getUserStore().updateStates(updatedStates);
  }

  syncDraft() {
    const userStoreStates: User = this.getUserStore().getStates();
    const userDraftModel: UserDraftModel = new UserDraftModel();
    
    for (let [dataLabel, value] of Object.entries(userStoreStates)) {
      if (Array.isArray(value)) {
        value = cloneDeep(value);
      }
  
      userDraftModel.updateValue(value, dataLabel as UserDataLabels);
    }
  }

  setActiveSpace(activeSpace: Space): void {
    this.getUserStore().setActiveSpace(activeSpace);
  }

  private getUserStore(): UserStore {
    return this.storeManager.getStore(Stores.USER_STORE) as UserStore;
  }
}
