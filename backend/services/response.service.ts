import { StatusCodes } from '../../common/constants';

export class ResponseService {
  private statusCode: StatusCodes;
  private body: any;

  constructor(statusCode: StatusCodes, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getBody(): any {
    return this.body;
  }
}
