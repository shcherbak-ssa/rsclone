import Joi from 'joi';

import { NewSpace } from '../../common/entities';
import { parseValidationError, Validation } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { SpacesValidation } from '../controllers/spaces.controller';

export class SpacesValidationImpl implements SpacesValidation {
  validation: Validation;

  constructor() {
    this.validation = new Validation();
  }

  async validateCreatedSpace(newSpace: NewSpace): Promise<any> {
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
}