import { RequestPathnames } from '../../../common/constants';
import { registrationDataLabels } from '../../data/auth.data';
import { UserInputsStoreState } from '../../types/user-inputs.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface RegistrationValidation {
  validateRegistrationData(inputValues: UserInputsStoreState): Promise<UserInputsStoreState>;
}

export class RegistrationModel extends AuthModel {
  async createUser() {
    const validation: RegistrationValidation = new AuthValidation();

    await this.runAuthMode({
      inputDataLabels: registrationDataLabels,
      urlPathname: RequestPathnames.REGISTRATION,
      validateFunction: validation.validateRegistrationData.bind(validation),
    });
  }
}
