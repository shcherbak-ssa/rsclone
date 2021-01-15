import { RequestPathnames } from '../../../common/constants';
import { registrationDataLabels } from '../../data/auth.data';
import { AuthUserData } from '../../types/auth.types';
import { UserInputsStoreState } from '../../types/user-inputs.types';
import { UserLocalStorageType } from '../../types/user.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface RegistrationValidation {
  validateRegistrationData(inputValues: UserInputsStoreState): Promise<void>;
}

export class RegistrationModel extends AuthModel {
  private validation: RegistrationValidation;

  constructor() {
    super();
    this.validation = new AuthValidation();
  }

  async createUser() {
    try {
      const inputValues: UserInputsStoreState = this.getInputValues(registrationDataLabels);
      await this.validation.validateRegistrationData(inputValues);

      const authUserData: AuthUserData = this.getAuthData();
      const registrationUser = {...inputValues, ...authUserData};
      const user: UserLocalStorageType
        = await this.sendRequest(RequestPathnames.REGISTRATION, registrationUser);

      console.log(user);
    } catch (error) {
      this.parseError(error);
    }
  }
}
