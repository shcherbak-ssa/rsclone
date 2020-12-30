import { StoreStateType, dispatchAction } from "../store";
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

  getMode() {
    return (state: StoreStateType) => state.mode;
  }
}

export const modeModel: ModeModel = new ModeModel();
