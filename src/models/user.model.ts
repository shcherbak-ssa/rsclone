import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { StoreManager } from '../types/store.types';
import { User, UserStore } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { UpdatedStates } from '../types/user.types';
import { UserInputsStore } from '../types/user-inputs.types';

export class UserModel {
  private storeManager: StoreManager;
  private userInputsStore: UserInputsStore;

  constructor() {
    this.storeManager = new StoreManagerService();
    this.userInputsStore = this.storeManager.getStore(Stores.USER_INPUTS_STORE) as UserInputsStore;
  }
  
  async initUserData(user: User): Promise<void> {
    await this.storeManager.addStore(Stores.USER_STORE);
    this.getUserStore().setStates(user);
  }

  updateState(updatedStateLabels: UserDataLabels[]): void {
    const updatedStates = this.userInputsStore.getInputValues(updatedStateLabels) as UpdatedStates;
    this.getUserStore().updateStates(updatedStates);
  }

  private getUserStore(): UserStore {
    return this.storeManager.getStore(Stores.USER_STORE) as UserStore;
  }
}
