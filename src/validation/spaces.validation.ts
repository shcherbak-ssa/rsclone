import Joi from 'joi';

import { NewSpace, UpdatedSpace } from '../../common/entities';
import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { SpacesValidation } from '../models/spaces.model';

export class SpacesValidationImpl implements SpacesValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }

  async validateCreatedSpace(newSpace: NewSpace): Promise<NewSpace> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.SPACE_NAME]: this.validation.spaceName().required().empty(),
        [UserDataLabels.SPACE_COLOR]: this.validation.spaceColor().required(),
        [UserDataLabels.SPACE_LOGO]: this.validation.spaceLogo(),
      });
  
      return await validationSchema.validateAsync(newSpace);
    } catch (error) {
      parseValidationError(error);
    }
  }

  async validateUpdatedSpace(updatedSpace: UpdatedSpace): Promise<UpdatedSpace> {
    try {
      const validationSchema: Joi.ObjectSchema = Joi.object({
        [UserDataLabels.SPACE_ID]: Joi.string(),
        updates: Joi.object({
          [UserDataLabels.SPACE_NAME]: this.validation.spaceName().empty(),
          [UserDataLabels.SPACE_COLOR]: this.validation.spaceColor(),
          [UserDataLabels.SPACE_LOGO]: this.validation.spaceLogo(),
        }),
      });
  
      return await validationSchema.validateAsync(updatedSpace);
    } catch (error) {
      parseValidationError(error);
    }
  }
}
