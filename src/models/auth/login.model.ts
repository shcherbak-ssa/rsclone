import { RequestPathnames } from '../../../common/constants';
import { loginDataLabels } from '../../data/auth.data';
import { UserInputsStoreState } from '../../types/user-inputs.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface LoginValidation {
  validateLoginData(inputValues: UserInputsStoreState): Promise<UserInputsStoreState>;
}

export class LoginModel extends AuthModel {
  async loginUser() {
    const validation: LoginValidation = new AuthValidation();

    await this.runAuthMode({
      inputDataLabels: loginDataLabels,
      urlPathname: RequestPathnames.LOGIN,
      validateFunction: validation.validateLoginData.bind(validation),
    });
  }
}
