import { ErrorNames } from '../../common/constants';

class ResponseError implements Error {
  name: string = '';
  message: string;
  protected payload: any;

  constructor(message: string, payload?: any) {
    this.message = message;
    this.payload = payload;
  }

  getMessage() {
    return this.message;
  }
}

export class ClientError extends ResponseError {
  name: string = ErrorNames.CLIENT_ERROR;

  constructor(message: string, payload: any) {
    super(message, payload);
  }

  getPayload() {
    return this.payload;
  }
}

export class ServerError extends ResponseError {
  name: string = ErrorNames.SERVER_ERROR;

  constructor(message: string, payload: any) {
    super(message, payload);
  }
}
