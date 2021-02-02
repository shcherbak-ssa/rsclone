import Joi from 'joi';

import { UpdatedPage } from '../../common/entities';
import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { PagesValidation } from '../controllers/pages.controller';

export class PagesValidationImpl implements PagesValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }

  async validateUpdatedPage(updatedPage: UpdatedPage): Promise<any> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.PAGE_ID]: Joi.string(),
        updates: Joi.object({
          [UserDataLabels.PAGE_TITLE]: this.validation.pageTitle(),
          [UserDataLabels.PAGE_DESCRIPTION]: this.validation.pageDescription(),
          [UserDataLabels.PAGE_CONTENT]: this.validation.pageContent(),
        }),
      });
  
      return await validationSchema.validateAsync(updatedPage);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
