import { Stores, UserDataLabels } from '../constants';
import { InputState, UpdatedInput, UserInputsStore, UserInputState } from '../types/user-inputs.types';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { LanguageLabels, Themes } from '../../common/constants';

export class UserInputsModel {
  private userInputsStore: UserInputsStore;

  constructor() {
    const storeManager: StoreManager = new StoreManagerService();
    this.userInputsStore = storeManager.getStore(Stores.USER_INPUTS_STORE) as UserInputsStore;
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

  resetStates(): void {
    this.userInputsStore.resetStates();
  }
}
