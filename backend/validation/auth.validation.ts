import Joi from 'joi';

import { LoginUser, RegistrationUser } from '../types/user.types';
import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { AuthValidation } from '../controllers/auth.controller';

export class AuthValidationImpl implements AuthValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }
  
  async validateRegistrationData(user: RegistrationUser): Promise<void> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.FULLNAME]: this.validation.fullname().required().empty(),
        ...this.getCommonValidationSchema(),
      });
  
      await validationSchema.validateAsync(user);
    } catch (error) {
      parseValidationError(error);
    }
  }

  async validateLoginData(user: LoginUser): Promise<void> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        ...this.getCommonValidationSchema(),
      });
  
      await validationSchema.validateAsync(user);
    } catch (error) {
      parseValidationError(error);
    }
  }

  private getCommonValidationSchema() {
    return {
      [UserDataLabels.EMAIL]: this.validation.email().required().empty(),
      [UserDataLabels.PASSWORD]: this.validation.password().required().empty(),
    }
  }
}
