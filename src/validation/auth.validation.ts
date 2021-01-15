import Joi from 'joi';

import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { RegistrationValidation } from '../models/auth/registration.model';
import { UserInputsStoreState } from '../types/user-inputs.types';

export class AuthValidation implements RegistrationValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }
  
  async validateRegistrationData(inputValues: UserInputsStoreState): Promise<void> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.FULLNAME]: this.validation.fullname().empty(),
        [UserDataLabels.EMAIL]: this.validation.email().empty(),
        [UserDataLabels.PASSWORD]: this.validation.password().empty(),
      });
  
      await validationSchema.validateAsync(inputValues);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
