import Joi from 'joi';
import { UserDataLabels } from '../src/constants';
import { ErrorLabels, ErrorNames, LanguageLabels, Themes } from './constants';

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_FULLNAME_LENGTH: number = 127;
const MAX_PASSWORD_LENGTH: number = 256;
const MAX_EMAIL_LENGTH: number = 256;

export type ValidationErrorPayload = {
  dataLabel: UserDataLabels,
  errorLabel: ErrorLabels,
};

export class ValidationError implements Error {
  name: string = ErrorNames.VALIDATION_ERROR;
  message: string;
  payload: ValidationErrorPayload;

  constructor(message: string, payload: ValidationErrorPayload) {
    this.message = message;
    this.payload = payload;
  }
}

export class Validation {
  fullname(): Joi.StringSchema {
    return Joi.string()
      .alphanum()
      .max(MAX_FULLNAME_LENGTH)
  }

  email(): Joi.StringSchema {
    return Joi.string()
      .email({ tlds: { allow: false } })
      .max(MAX_EMAIL_LENGTH)
  }

  password(): Joi.StringSchema {
    return Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
  }

  language(): Joi.StringSchema {
    return Joi.string()
      .valid(
        LanguageLabels.ENGLISH,
        LanguageLabels.RUSSIAN,
        LanguageLabels.ITALIAN,
      );
  }

  theme(): Joi.StringSchema {
    return Joi.string()
      .valid(
        Themes.ORIGINAL,
        Themes.LIGHT,
        Themes.DARK,
      );
  }
}

export function parseValidationError({details}) {
  console.log(details[0]);
  const {type, message, context: {key}} = details[0];

  switch (type) {
    case 'string.empty':
      throwValidationError(message, key, ErrorLabels.EMPTY_VALUE);
      break;
    case 'string.email':
      throwValidationError(message, key, ErrorLabels.INVALID_EMAIL);
    case 'string.min':
      throwValidationError(message, key, ErrorLabels.PASSWORD_MIN);
  }
}

function throwValidationError(message: string, dataLabel: string, errorLabel: ErrorLabels) {
  throw new ValidationError(message, {
    dataLabel: dataLabel as UserDataLabels,
    errorLabel,
  });
}
