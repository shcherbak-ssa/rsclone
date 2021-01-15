import {
  initialState,
  InputState,
  UpdatedInput,
  UserInputsStore,
  UserInputsStoreState,
  UserInputState,
} from '../types/user-inputs.types';
import { Stores, UserDataLabels } from '../constants';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { LanguageLabels, Themes } from '../../common/constants';

export class UserInputsModel {
  private userInputsStore: UserInputsStore;

  constructor() {
    const storeManager: StoreManager = new StoreManagerService();
    this.userInputsStore = storeManager.getStore(Stores.USER_INPUTS_STORE) as UserInputsStore;
  }

  getInputStates(dataLabel: UserDataLabels): UserInputState {
    return this.userInputsStore.getInputStates(dataLabel);
  }
  
  updateInputValue(value: string, dataLabel: UserDataLabels): void {
    const updatedInput: UpdatedInput = {
      [dataLabel]: { value, error: '' },
    };

    this.userInputsStore.updateInputValue(updatedInput);
  }

  setInputError(error: string, dataLabel: UserDataLabels): void {
    const currentInput: UserInputState = this.userInputsStore.getInputStates(dataLabel) as InputState;
    const updatedInput: UpdatedInput = {
      [dataLabel]: { value: currentInput.value, error },
    };

    this.userInputsStore.setInputError(updatedInput);
  }

  changeLanguage(nextLanguage: LanguageLabels): void {
    this.userInputsStore.changeLanguage(nextLanguage);
  }

  changeTheme(nextTheme: Themes): void {
    this.userInputsStore.changeTheme(nextTheme);
  }

  resetStates(resetDataLabels: UserDataLabels[]): void {
    const resetedStates: UserInputsStoreState = {};

    resetDataLabels.forEach((dataLabel) => {
      resetedStates[dataLabel] = initialState[dataLabel];
    });

    this.userInputsStore.resetStates(resetedStates);
  }
}
