import { CreatedUser, RegistrationUser } from '../types/user.types';
import { ControllerData } from '../types/controller.types';
import { RegistrationModel } from '../models/registration.model';
import { AuthValidation } from '../validation/auth.validation';
import { StatusCodes } from '../../common/constants';

export interface RegistrationValidation {
  validateRegistrationData(user: RegistrationUser): Promise<void>;
}

export class AuthController {
  private registrationModel: RegistrationModel;
  private validation: RegistrationValidation;

  constructor() {
    this.registrationModel = new RegistrationModel();
    this.validation = new AuthValidation();
  }

  async createNewUser({body: user, responseSender}: ControllerData) {
    try {
      await this.validation.validateRegistrationData(user);
      await this.registrationModel.checkExistingUserWithCurrentEmail(user.email);
      
      const createdUser: CreatedUser = await this.registrationModel.createUser(user);
      await responseSender.sendSuccessJsonResponse(createdUser, StatusCodes.CREATED);
    } catch (error) {
      console.log('error', error);
      await responseSender.sendErrorResponse(error);
    }
  }
}
