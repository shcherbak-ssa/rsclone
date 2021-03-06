import { AccessUser, LoginUser, RegistrationUser } from '../types/user.types';
import { ControllerData } from '../types/controller.types';
import { RegistrationModel } from '../models/registration.model';
import { AuthValidationImpl } from '../validation/auth.validation';
import { StatusCodes } from '../../common/constants';
import { LoginModel } from '../models/login.model';
import { UniqueModel } from '../models/unique.model';

export interface AuthValidation {
  validateRegistrationData(user: RegistrationUser): Promise<void>;
  validateLoginData(user: LoginUser): Promise<void>;
}

export class AuthController {
  private uniqueModel: UniqueModel;
  private registrationModel: RegistrationModel;
  private loginModel: LoginModel;
  private validation: AuthValidation;

  constructor() {
    this.uniqueModel = new UniqueModel();
    this.registrationModel = new RegistrationModel();
    this.loginModel = new LoginModel();
    this.validation = new AuthValidationImpl();
  }

  async createNewUser({body: user, responseSender}: ControllerData): Promise<void> {
    try {
      await this.validation.validateRegistrationData(user);
      await this.uniqueModel.checkExistingUserWithCurrentEmail(user.email);
      
      const accessUser: AccessUser = await this.registrationModel.createUser(user);
      await responseSender.sendSuccessJsonResponse(accessUser, StatusCodes.CREATED);
    } catch (error) {
      await responseSender.sendErrorResponse(error);
    }
  }

  async loginUser({body: user, responseSender}: ControllerData): Promise<void> {
    try {
      await this.validation.validateLoginData(user);
      
      const accessUser: AccessUser = await this.loginModel.loginUser(user);
      await responseSender.sendSuccessJsonResponse(accessUser);
    } catch (error) {
      await responseSender.sendErrorResponse(error);
    }
  }
}
