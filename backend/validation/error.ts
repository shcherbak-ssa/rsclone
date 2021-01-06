const VALIDATION_ERROR: string = 'ValidationError';

export class ValidationError implements Error {
  name: string = VALIDATION_ERROR;
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}
