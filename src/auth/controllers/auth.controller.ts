import { ModeModel } from '../models/mode.model';

class AuthController {
  toggleMode() {
    ModeModel.toggleMode();
  }
}

export const authController: AuthController = new AuthController();
