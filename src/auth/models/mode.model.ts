import { dispatchAction } from "../store";
import { modeStore } from '../store/mode.store';

const {
  switchToRegistrationMode,
  switchToLoginMode,
} = modeStore.actions;

class ModeModel {
  switchToRegistrationMode() {
    dispatchAction(switchToRegistrationMode());
  }

  switchToLoginMode() {
    dispatchAction(switchToLoginMode());
  }
}

export const modeModel: ModeModel = new ModeModel();
