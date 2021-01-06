import { ParamSchema } from 'express-validator';
import { MAX_FIELD_LENGTH } from './constants';

export const nameValidation: ParamSchema = {
  isLength: {
    options: { max: MAX_FIELD_LENGTH },
    errorMessage: `Name cannot be over then ${MAX_FIELD_LENGTH} characters`,
  },
  escape: true,
  trim: true,
};
