import { ControllerData } from '../types/controller.types';
import { RegistrationModel } from '../models/registration.model';

export class AuthController {
  private registrationModel: RegistrationModel;

  constructor() {
    this.registrationModel = new RegistrationModel();
  }

  async createNewUser({body, responseSender}: ControllerData) {
    console.log(body);
    await responseSender.sendSuccessJsonResponse({test: ''});
  }
}
