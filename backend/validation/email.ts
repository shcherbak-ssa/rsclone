import { ParamSchema } from 'express-validator';
import { MAX_FIELD_LENGTH } from './constants';

export const emailValidation: ParamSchema = {
  exists: {
    options: { checkFalsy: true },
    errorMessage: 'E-mail cannot be empty',
  },
  isLength: {
    options: { max: MAX_FIELD_LENGTH, min: 0 },
    errorMessage: `E-mail cannot be empty and over then ${MAX_FIELD_LENGTH} characters`,
  },
  errorMessage: 'Invalid e-mail address',
  escape: true,
  trim: true,
  normalizeEmail: true,
  isEmail: true,
};
