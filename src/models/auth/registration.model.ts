import { RequestPathnames } from '../../../common/constants';
import { registrationDataLabels } from '../../data/auth.data';
import { UserDraftStoreState } from '../../types/user-draft.types';
import { AuthValidation } from '../../validation/auth.validation';
import { AuthModel } from './auth.model';

export interface RegistrationValidation {
  validateRegistrationData(inputValues: UserDraftStoreState): Promise<UserDraftStoreState>;
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
