import { InputLabels } from '../constants';
import { InputsModel } from '../models/inputs.model';
import { ModeModel } from '../models/mode.model';

class AuthController {
  toggleMode() {
    ModeModel.toggleMode();
  }

  updateInputValue(value: string, inputLabel: InputLabels) {
    const inputsModel: InputsModel = new InputsModel();
    inputsModel.updateValue(value, inputLabel);
  }
}

export const authController: AuthController = new AuthController();
