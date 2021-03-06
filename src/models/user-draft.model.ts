import {
  initialState,
  InputState,
  UpdatedDraft,
  UserDraftStore,
  UserDraftStoreState,
  UserDraftState,
  ActiveSpace,
} from '../types/user-draft.types';
import { Stores, UserDataLabels } from '../constants';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { userInputLabels } from '../data/user.data';
import { Space } from '../../common/entities';
import { EMPTY_STRING } from '../constants/strings.constants';

export class UserDraftModel {
  private userDraftStore: UserDraftStore;

  constructor() {
    const storeManager: StoreManager = new StoreManagerService();
    this.userDraftStore = storeManager.getStore(Stores.USER_DRAFT_STORE) as UserDraftStore;
  }

  getDraftState(dataLabel: UserDataLabels): UserDraftState {
    return this.userDraftStore.getDraftState(dataLabel);
  }

  getDraftValues(dataLabels: UserDataLabels[]): UserDraftStoreState {
    return this.userDraftStore.getDraftValues(dataLabels);
  }
  
  updateValue(value: any, dataLabel: UserDataLabels): void {
    const updatedDraft: UpdatedDraft = {
      [dataLabel]: userInputLabels.includes(dataLabel) ? {value, error: EMPTY_STRING} : value,
    };

    this.userDraftStore.updateValue(updatedDraft);
  }

  setError(error: string, dataLabel: UserDataLabels): void {
    const currentState: UserDraftState = this.userDraftStore.getDraftState(dataLabel) as InputState;
    const updatedDraft: UpdatedDraft = {
      [dataLabel]: { value: currentState.value, error },
    };

    this.userDraftStore.setError(updatedDraft);
  }

  resetStates(resetDataLabels: UserDataLabels[]): void {
    const resetedStates: UserDraftStoreState = {};

    resetDataLabels.forEach((dataLabel) => {
      resetedStates[dataLabel] = initialState[dataLabel];
    });

    this.userDraftStore.resetStates(resetedStates);
  }

  setActiveSpace(space: Space): void {
    const activeSpace: ActiveSpace = {
      ...space,
      name: { value: space.name, error: EMPTY_STRING },
    };

    this.userDraftStore.setActiveSpace(activeSpace);
  }
}
