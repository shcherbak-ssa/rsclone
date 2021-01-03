import { InputLabels, REGISTRATION_MODE_LABEL } from '../constants';
import { InputsModel } from '../models/inputs.model';
import { ModeModel } from '../models/mode.model';
import { LoginModel, RegistrationModel } from '../models/auth.model';
import { storeStates } from '../store';

class AuthController {
  toggleMode() {
    ModeModel.toggleMode();
  }

  updateInputValue(value: string, inputLabel: InputLabels) {
    const inputsModel: InputsModel = new InputsModel();
    inputsModel.updateValue(value, inputLabel);
  }

  runCurrentMode() {
    const currentMode = storeStates.getCurrentMode();

    if (currentMode === REGISTRATION_MODE_LABEL) {
      RegistrationModel.startRegistration();
    } else {
      LoginModel.startLogin();
    }
  }
}

export const authController: AuthController = new AuthController();
