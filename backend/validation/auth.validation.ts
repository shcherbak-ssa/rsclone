import Joi from 'joi';

import { RegistrationUser } from '../types/user.types';
import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { RegistrationValidation } from '../controllers/auth.controller';

export class AuthValidation implements RegistrationValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }
  
  async validateRegistrationData(user: RegistrationUser): Promise<void> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.FULLNAME]: this.validation.fullname().required().empty(),
        [UserDataLabels.EMAIL]: this.validation.email().required().empty(),
        [UserDataLabels.PASSWORD]: this.validation.password().required().empty(),
        [UserDataLabels.LANGUAGE]: this.validation.language().required(),
        [UserDataLabels.THEME]: this.validation.theme().required(),
      });
  
      await validationSchema.validateAsync(user);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
