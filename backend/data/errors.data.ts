import { StatusCodes, ErrorNames } from '../../common/constants';
import { ResponseData } from './response.data';

class CustomError implements Error {
  name: string = '';
  message: string;
  private statusCode: number;
  private body: any;

  constructor(message: string, statusCode: number, body: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.body = body;

    this.addErrorMessageToBody();
  }

  getResponseData(): ResponseData {
    return new ResponseData(this.statusCode, this.body);
  }

  private addErrorMessageToBody(): void {
    this.body.message = this.message;
  }
}

export class ClientError extends CustomError {
  name: string = ErrorNames.CLIENT_ERROR;

  constructor(message: string, statusCode: number, body: any = {}) {
    super(message, statusCode, body);
  }
}

export class ServerError extends CustomError {
  name: string = ErrorNames.SERVER_ERROR;

  constructor(message: string, body: any = {}) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, body);
  }
}
