import cloneDeep from 'clone-deep';

import { Stores, UserDataLabels } from '../constants';
import { UserInputState } from '../types/user.types';
import { InitialInputState } from '../types/tools.types';
import { storeService } from '../services/store.service';
import { ToolsService } from '../services/tools.service';
import { StoreActions } from '../types/store.types';

export class UserInputsModel {
  private initialInputState: UserInputState;
  private storeActions: StoreActions;

  constructor() {
    const toolsService: InitialInputState = new ToolsService();
    this.initialInputState = toolsService.getInitialInputState();
    this.storeActions = storeService.getStoreActions(Stores.USER_INPUTS_STORE);
  }
  
  updateInputValue(value: string, inputLabel: UserDataLabels) {
    const updatedInput = {
      [inputLabel]: { value, error: '' },
    };

    this.storeActions.updateInputValue(updatedInput);
  }

  setInputError(error: string, inputLabel: UserDataLabels) {
    this.storeActions.setInputError(error, inputLabel);
  }

  resetStates() {
    const state = storeService.getStates()[Stores.USER_INPUTS_STORE];
    const resetedState = cloneDeep(state);

    for (const inputLabel of Object.keys(resetedState)) {
      resetedState[inputLabel] = this.initialInputState;
    }

    this.storeActions.resetStates(resetedState);
  }

  addInputs(inputNames: UserDataLabels[]) {
    const inputs = {};

    for (const inputName of inputNames) {
      inputs[inputName] = this.initialInputState;
    }

    this.storeActions.addInputs(inputs);
  }
}
