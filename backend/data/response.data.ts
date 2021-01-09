import { StatusCodes } from '../../common/constants';

export class ResponseData {
  private statusCode: StatusCodes;
  private body: any;

  constructor(statusCode: StatusCodes, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getBody() {
    return this.body;
  }
}
