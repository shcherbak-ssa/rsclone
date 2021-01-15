import { RequestPathnames } from '../../../common/constants';
import { loginDataLabels } from '../../data/auth.data';
import { UserInputsStoreState } from '../../types/user-inputs.types';
import { UserLocalStorageType } from '../../types/user.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface LoginValidation {
  validateLoginData(inputValues: UserInputsStoreState): Promise<UserInputsStoreState>;
}

export class LoginModel extends AuthModel {
  private validation: LoginValidation;

  constructor() {
    super();
    this.validation = new AuthValidation();
  }

  async loginUser() {
    try {
      let inputValues: UserInputsStoreState = this.getInputValues(loginDataLabels);
      inputValues = await this.validation.validateLoginData(inputValues);

      const loginUser = this.preparingUserData(inputValues);
      const user: UserLocalStorageType
        = await this.sendRequest(RequestPathnames.LOGIN, loginUser);

      console.log(user);
    } catch (error) {
      this.parseError(error);
    }
  }
}
