import { LOGIN_MODE_LABEL } from "../constants";
import { dispatchAction, storeStates } from "../store";
import { formStore } from "../store/form.store";
import { inputsStore } from "../store/inputs.store";
import { modeStore } from '../store/mode.store';

const { switchToRegistrationMode, switchToLoginMode } = modeStore.actions;
const { updateState } = inputsStore.actions;
const { removeFormError } = formStore.actions;

export class ModeModel {
  static toggleMode() {
    const modeModel: ModeModel = new ModeModel();
    const currentMode: string = storeStates.getCurrentMode();

    if (currentMode === LOGIN_MODE_LABEL) {
      modeModel.switchToRegistrationMode();
    } else {
      modeModel.switchToLoginMode();
    }

    dispatchAction(updateState());
    dispatchAction(removeFormError());
  }

  switchToRegistrationMode() {
    dispatchAction(switchToRegistrationMode());
  }

  switchToLoginMode() {
    dispatchAction(switchToLoginMode());
  }
}
