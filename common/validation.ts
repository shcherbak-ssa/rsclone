import Joi from 'joi';
import { UserDataLabels } from '../src/constants';
import { ErrorLabels, ErrorNames, LanguageLabels, Themes } from './constants';

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_FIELD_LENGTH: number = 256;

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
      .trim()
      .pattern(/^[\w\s]+$/)
      .max(MAX_FIELD_LENGTH)
  }

  email(): Joi.StringSchema {
    return Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .max(MAX_FIELD_LENGTH)
  }

  password(): Joi.StringSchema {
    return Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_FIELD_LENGTH)
  }

  username(): Joi.StringSchema {
    return Joi.string()
      .trim()
      .pattern(/^[-a-zA-Z0-9]+$/)
      .max(MAX_FIELD_LENGTH)
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

export function parseValidationError(error: any) {
  const {type, message, context: {key}} = error.details[0];
  console.log(error.details); // @TODO: remove

  switch (type) {
    case 'string.empty':
      throwValidationError(message, key, ErrorLabels.EMPTY_VALUE);
    case 'string.email':
      throwValidationError(message, key, ErrorLabels.INVALID_EMAIL);
    case 'string.min':
      throwValidationError(message, key, ErrorLabels.PASSWORD_MIN);
    case 'string.pattern.base':
      if (key === UserDataLabels.FULLNAME) {
        throwValidationError(message, key, ErrorLabels.FULLNAME);
      } else {
        throwValidationError(message, key, ErrorLabels.USERNAME);
      }
    case 'string.max':
      throwValidationError(message, key, ErrorLabels.FIELD_MAX);
  }
}

function throwValidationError(message: string, dataLabel: string, errorLabel: ErrorLabels) {
  throw new ValidationError(message, {
    dataLabel: dataLabel as UserDataLabels,
    errorLabel,
  });
}
