import Joi from 'joi';

import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { LoginValidation } from '../models/auth/login.model';
import { RegistrationValidation } from '../models/auth/registration.model';
import { UserDraftStoreState } from '../types/user-draft.types';

export class AuthValidation implements RegistrationValidation, LoginValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }
  
  async validateRegistrationData(inputValues: UserDraftStoreState): Promise<UserDraftStoreState> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.FULLNAME]: this.validation.fullname().empty(),
        ...this.getCommonValidationSchema(),
      });
  
      return await validationSchema.validateAsync(inputValues);
    } catch (error) {
      parseValidationError(error);
    }
  }

  async validateLoginData(inputValues: UserDraftStoreState): Promise<UserDraftStoreState> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        ...this.getCommonValidationSchema(),
      });
  
      return await validationSchema.validateAsync(inputValues);
    } catch (error) {
      parseValidationError(error);
    }
  }

  private getCommonValidationSchema() {
    return {
      [UserDataLabels.EMAIL]: this.validation.email().empty(),
      [UserDataLabels.PASSWORD]: this.validation.password().empty(),
    };
  }
}
