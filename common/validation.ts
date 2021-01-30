import Joi from 'joi';

import {
  ErrorLabels,
  ErrorNames,
  LanguageLabels,
  Themes,
  ShortcurtsSections,
  ShortcutsLabels,
} from './constants';
import { UserDataLabels } from '../backend/constants';
import { spaceColors } from './data';

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_FIELD_LENGTH: number = 256;
const MIN_PAGE_TITLE_LENGTH: number = 1;
export const MAX_PAGE_TITLE_LENGTH: number = 256;
export const MAX_PAGE_DESCRIPTION_LENGTH: number = 512;

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
  avatar(): Joi.StringSchema {
    return Joi.string()
  }

  fullname(): Joi.StringSchema {
    return this.defaultStringPattern();
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

  shortcuts(): Joi.ArraySchema {
    return Joi.array()
      .items(
        Joi.object({
          section: Joi.string()
            .valid(
              ShortcurtsSections.HOMEPAGE,
              ShortcurtsSections.SPACE,
            ),
          keys: Joi.string(),
          label: Joi.string()
            .valid(
              ShortcutsLabels.ADD_PAGE,
              ShortcutsLabels.ADD_SPACE
            ),
        })
      )
  }

  spaceName(): Joi.StringSchema {
    return this.defaultStringPattern();
  }
  
  spaceColor(): Joi.StringSchema {
    return Joi.string()
      .valid(...spaceColors);
  }

  spaceLogo(): Joi.StringSchema {
    return Joi.string();
  }

  pageTitle(): Joi.StringSchema {
    return Joi.string()
      .trim()
      .min(MIN_PAGE_TITLE_LENGTH)
      .max(MAX_PAGE_TITLE_LENGTH);
  }

  pageDescription(): Joi.StringSchema {
    return Joi.string()
      .trim()
      .max(MAX_PAGE_DESCRIPTION_LENGTH);
  }

  private defaultStringPattern(): Joi.StringSchema {
    return Joi.string()
      .trim()
      .pattern(/^[-\w\sа-яА-Я]+$/)
      .max(MAX_FIELD_LENGTH)
  }
}

export function parseValidationError(error: any) {
  const {type, message, context} = error.details[0];
  const {key} = context;

  switch (type) {
    case 'string.empty':
      throwValidationError(message, key, ErrorLabels.EMPTY_VALUE);
    case 'string.email':
      throwValidationError(message, key, ErrorLabels.INVALID_EMAIL);
    case 'string.min':
      throwValidationError(message, key, ErrorLabels.PASSWORD_MIN);
    case 'string.pattern.base':
      throwValidationError(message, key, ErrorLabels.ALPHA_NUMERIC);
    case 'string.max':
      throwValidationError(message, key, ErrorLabels.FIELD_MAX);
    case 'object.with':
      if (context.main === UserDataLabels.PASSWORD) {
        throwValidationError(message, context.peer, ErrorLabels.PASSWORD_REQUIRED);
      } else {
        throwValidationError(message, context.peer, ErrorLabels.NEW_PASSWORD_REQUIRED);
      }
    default:
      throw error;
  }
}

function throwValidationError(message: string, dataLabel: string, errorLabel: ErrorLabels) {
  throw new ValidationError(message, {
    dataLabel: dataLabel as UserDataLabels,
    errorLabel,
  });
}
