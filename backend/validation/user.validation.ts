import Joi from 'joi';

import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { UserValidation } from '../controllers/users.controller';
import { UpdatedUserData } from '../types/user.types';

export class UserValidationImpl implements UserValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }

  async validate(updatedData: UpdatedUserData): Promise<any> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.AVATAR]: this.validation.avatar(),
        [UserDataLabels.FULLNAME]: this.validation.fullname().empty(),
        [UserDataLabels.EMAIL]: this.validation.email().empty(),
        [UserDataLabels.PASSWORD]: this.validation.password().empty(),
        [UserDataLabels.NEW_PASSWORD]: this.validation.password().empty(),
        [UserDataLabels.USERNAME]: this.validation.username().empty(),
        [UserDataLabels.LANGUAGE]: this.validation.language(),
        [UserDataLabels.THEME]: this.validation.theme(),
        [UserDataLabels.SHORTCUTS]: this.validation.shortcuts(),
      })
      .with(UserDataLabels.PASSWORD, UserDataLabels.NEW_PASSWORD)
      .with(UserDataLabels.NEW_PASSWORD, UserDataLabels.PASSWORD);

      return await validationSchema.validateAsync(updatedData);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
