import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { StoreManager } from '../types/store.types';
import { UpdatedData, User, UserStore } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { UpdatedStates } from '../types/user.types';
import { UserDraftStore } from '../types/user-draft.types';
import { UserDraftModel } from './user-draft.model';

export class UserModel {
  private storeManager: StoreManager;
  private userDraftStore: UserDraftStore;

  constructor() {
    this.storeManager = new StoreManagerService();
    this.userDraftStore = this.storeManager.getStore(Stores.USER_DRAFT_STORE) as UserDraftStore;
  }
  
  async initUserData(user: User): Promise<void> {
    await this.storeManager.addStore(Stores.USER_STORE);

    this.getUserStore().setStates(user);
    this.syncDraft();
  }

  updateState(updatedStates: UpdatedData): void {
    this.getUserStore().updateStates(updatedStates);
  }

  syncDraft() {
    const userStoreStates: User = this.getUserStore().getStates();
    const userDraftModel: UserDraftModel = new UserDraftModel();
    
    for (const [dataLabel, value] of Object.entries(userStoreStates)) {
      userDraftModel.updateValue(value, dataLabel as UserDataLabels);
    }
  }

  private getUserStore(): UserStore {
    return this.storeManager.getStore(Stores.USER_STORE) as UserStore;
  }
}
