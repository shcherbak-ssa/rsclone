import { InputLabels } from "../constants";

const EMPTY_FIELD_LENGTH: number = 0;
const MAX_FIELD_LENGTH: number = 127;
const MIN_PASSWORD_LENGTH: number = 8;

const NAME_REGEXP: RegExp = /[-<>(){}!#$%^&*_=+[\]\.,;:@\"]/;
const USERNAME_REGEXP: RegExp = /[<>(){}!#$%^&*=+[\]\.,;:@\"\s]/;
const EMAIL_REGEXP: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const VALIDATION_ERROR_NAME: string = 'ValidationError';

export class ValidationError implements Error {
  name: string = VALIDATION_ERROR_NAME;
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}

export class ValidationService {
  validate(value: string, inputLabel: InputLabels) {
    this.emptyFieldCheck(value, inputLabel);
    this.maxFieldLengthCheck(value, inputLabel);

    switch (inputLabel) {
      case InputLabels.NAME_INPUT_LABEL:
        this.validateName(value);
        break;
      case InputLabels.EMAIL_INPUT_LABEL:
        this.validateEmail(value);
        break;
      case InputLabels.PASSWORD_INPUT_LABEL:
        this.validatePassword(value);
        break;
      case InputLabels.USERNAME_INPUT_LABEL:
        this.validateUsername(value);
        break;
    }
  }

  private emptyFieldCheck(value: string, inputLabel: InputLabels) {
    if (value.length === EMPTY_FIELD_LENGTH) {
      throw new ValidationError('Field cannot be empty', { inputLabel });
    }
  }

  private maxFieldLengthCheck(value: string, inputLabel: InputLabels) {
    if (value.length > MAX_FIELD_LENGTH) {
      throw new ValidationError(
        `Field value cannot be over ${MAX_FIELD_LENGTH} characters`, 
        { inputLabel },
      );
    }
  }

  private validateName(name: string) {
    if (NAME_REGEXP.test(name.toLowerCase())) {
      throw new ValidationError(
        `Name can contain only letters, numbers and spaces`, 
        {
          inputLabel: InputLabels.NAME_INPUT_LABEL
        },
      );
    }
  }

  private validateEmail(email: string) {
    if (!EMAIL_REGEXP.test(email.toLowerCase())) {
      throw new ValidationError(
        `Invalid e-mail address`, 
        {
          inputLabel: InputLabels.EMAIL_INPUT_LABEL
        },
      );
    }
  }

  private validatePassword(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new ValidationError(
        `Password cannot be under ${MIN_PASSWORD_LENGTH} characters`, 
        {
          inputLabel: InputLabels.PASSWORD_INPUT_LABEL
        },
      );
    }
  }

  private validateUsername(username: string) {
    if (USERNAME_REGEXP.test(username.toLowerCase())) {
      throw new ValidationError(
        `Username can contain only letters, numbers and lines`, 
        {
          inputLabel: InputLabels.USERNAME_INPUT_LABEL
        },
      );
    }
  }
}
