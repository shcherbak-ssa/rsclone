import { InputLabels } from "../constants";
import { AuthError } from "../errors/auth.error";

const EMPTY_FIELD_LENGTH: number = 0;
const MAX_FIELD_LENGTH: number = 127;
const MIN_PASSWORD_LENGTH: number = 8;

const NAME_REGEXP: RegExp = /[-<>(){}!#$%^&*_=+[\]\.,;:@\"]/g;

const EMAIL_REGEXP: RegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
    }
  }

  private emptyFieldCheck(value: string, inputLabel: InputLabels) {
    if (value.length === EMPTY_FIELD_LENGTH) {
      throw new AuthError('Field cannot be empty', inputLabel);
    }
  }

  private maxFieldLengthCheck(value: string, inputLabel: InputLabels) {
    if (value.length > MAX_FIELD_LENGTH) {
      throw new AuthError(
        `Field value cannot be over ${MAX_FIELD_LENGTH} characters`, 
        inputLabel,
      );
    }
  }

  private validateName(name: string) {
    if (NAME_REGEXP.test(name.toLowerCase())) {
      throw new AuthError(
        `Name can contains only letters, numbers and spaces`, 
        InputLabels.NAME_INPUT_LABEL,
      );
    }
  }

  private validateEmail(email: string) {
    if (!EMAIL_REGEXP.test(email.toLowerCase())) {
      throw new AuthError(
        `Invalid e-mail address`, 
        InputLabels.EMAIL_INPUT_LABEL,
      );
    }
  }

  private validatePassword(password: string) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new AuthError(
        `Password cannot be under ${MIN_PASSWORD_LENGTH} characters`, 
        InputLabels.PASSWORD_INPUT_LABEL,
      );
    }
  }
}
