import Joi from 'joi';

import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { UserUpdateValidation } from '../models/user-update.model';
import { UpdatedData } from '../types/user.types';

export class UserValidation implements UserUpdateValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }

  async validate(updatedData: UpdatedData): Promise<UpdatedData> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.EMAIL]: this.validation.email().empty(),
        [UserDataLabels.LANGUAGE]: this.validation.language(),
        [UserDataLabels.THEME]: this.validation.theme(),
      });

      return await validationSchema.validateAsync(updatedData);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
