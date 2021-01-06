import { ParamSchema } from 'express-validator';
import { MAX_FIELD_LENGTH, MIN_PASSWORD_LENGTH } from './constants';

export const passwordValidation: ParamSchema = {
  isLength: {
    options: { max: MAX_FIELD_LENGTH, min: MIN_PASSWORD_LENGTH },
    errorMessage: `Password cannot be under ${MIN_PASSWORD_LENGTH} and over then ${MAX_FIELD_LENGTH} characters`,
  },
}
