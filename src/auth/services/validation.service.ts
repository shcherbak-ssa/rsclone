import { InputLabels } from "../constants";

const VALIDATION_ERROR_NAME: string = 'ValidationError';

const EMPTY_FIELD_LENGTH: number = 0;
const MAX_FIELD_LENGTH: number = 127;
const MIN_PASSWORD_LENGTH: number = 8;

const EMAIL_REGEXP: RegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class ValidationError implements Error {
  name: string = VALIDATION_ERROR_NAME;
  message: string;
  inputLabel: InputLabels;

  constructor(message: string, inputLabel: InputLabels) {
    this.message = message;
    this.inputLabel = inputLabel;
  }
}

export class ValidationService {
  validate(value: string, inputLabel: InputLabels) {
    console.log(value, inputLabel);
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
    }
  }

  private emptyFieldCheck(value: string, inputLabel: InputLabels) {
    if (value.length === EMPTY_FIELD_LENGTH) {
      throw new ValidationError('Field cannot be empty', inputLabel);
    }
  }

  private maxFieldLengthCheck(value: string, inputLabel: InputLabels) {
    if (value.length > MAX_FIELD_LENGTH) {
      throw new ValidationError(
        `Field value cannot be over ${MAX_FIELD_LENGTH} characters`, 
        inputLabel,
      );
    }
  }

  private validateName(name: string) {}

  private validateEmail(email: string) {
    if (!EMAIL_REGEXP.test(email.toLowerCase())) {
      throw new ValidationError(
        `Invalid e-mail address`, 
        InputLabels.EMAIL_INPUT_LABEL,
      );
    }
  }

  private validatePassword(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new ValidationError(
        `Password cannot be under ${MIN_PASSWORD_LENGTH} characters`, 
        InputLabels.PASSWORD_INPUT_LABEL,
      );
    }
  }
}
