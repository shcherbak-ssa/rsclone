import { InputLabels } from "../constants";

const AUTH_ERROR_NAME: string = 'AuthError';

export class AuthError implements Error {
  name: string = AUTH_ERROR_NAME;
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}
