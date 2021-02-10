import { RequestPathnames } from '../../../common/constants';
import { loginDataLabels } from '../../data/auth.data';
import { UserDraftStoreState } from '../../types/user-draft.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface LoginValidation {
  validateLoginData(inputValues: UserDraftStoreState): Promise<UserDraftStoreState>;
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
