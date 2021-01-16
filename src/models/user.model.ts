import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { StoreManager } from '../types/store.types';
import { User, UserStore } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { UpdatedStates } from '../types/user.types';
import { UserDraftStore } from '../types/user-draft.types';

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
  }

  updateState(updatedStateLabels: UserDataLabels[]): void {
    const updatedStates = this.userDraftStore.getDraftValues(updatedStateLabels) as UpdatedStates;
    this.getUserStore().updateStates(updatedStates);
  }

  private getUserStore(): UserStore {
    return this.storeManager.getStore(Stores.USER_STORE) as UserStore;
  }
}
