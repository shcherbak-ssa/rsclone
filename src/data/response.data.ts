import { StatusCodes } from "../../common/constants";

const MIN_SUCCESS_STATUS_CODE: number = StatusCodes.SUCCESS;
const MAX_SUCCESS_STATUS_CODE: number = 299;

export class ResponseData {
  private isSuccessStatus: boolean;
  private statusCode: number;
  private payload: any;

  constructor(statusCode: number, payload: any) {
    this.isSuccessStatus = (
      statusCode >= MIN_SUCCESS_STATUS_CODE && statusCode <= MAX_SUCCESS_STATUS_CODE
    );
    this.statusCode = statusCode;
    this.payload = payload;
  }

  static create(statusCode: number, payload: any) {
    return new ResponseData(statusCode, payload);
  }

  isSuccessStatusCode() {
    return this.isSuccessStatus;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getPayload() {
    return this.payload;
  }
}
