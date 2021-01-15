import { RequestPathnames } from '../../../common/constants';
import { registrationDataLabels } from '../../data/auth.data';
import { UserInputsStoreState } from '../../types/user-inputs.types';
import { UserLocalStorageType } from '../../types/user.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface RegistrationValidation {
  validateRegistrationData(inputValues: UserInputsStoreState): Promise<UserInputsStoreState>;
}

export class RegistrationModel extends AuthModel {
  private validation: RegistrationValidation;

  constructor() {
    super();
    this.validation = new AuthValidation();
  }

  async createUser() {
    try {
      let inputValues: UserInputsStoreState = this.getInputValues(registrationDataLabels);
      inputValues = await this.validation.validateRegistrationData(inputValues);

      const registrationUser = this.preparingUserData(inputValues);
      const user: UserLocalStorageType
        = await this.sendRequest(RequestPathnames.REGISTRATION, registrationUser);

      console.log(user);
    } catch (error) {
      this.parseError(error);
    }
  }
}
