import { InputLabels } from "../constants";

const AUTH_ERROR_NAME: string = 'AuthError';

export class AuthError implements Error {
  name: string = AUTH_ERROR_NAME;
  message: string;
  inputLabel: InputLabels;

  constructor(message: string, inputLabel: InputLabels) {
    this.message = message;
    this.inputLabel = inputLabel;
  }
}
