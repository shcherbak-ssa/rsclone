import { StatusCodes } from "../../common/constants";
import { Response, UserLocalStorage } from "../types/services.types";
import { ClientError, ServerError } from './errors.service';
import { UserLocalStorageService } from "./user-local-storage.service";

const MIN_SUCCESS_STATUS_CODE: number = StatusCodes.SUCCESS;
const MAX_SUCCESS_STATUS_CODE: number = 299;

export class ResponseService implements Response {
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

  static create(statusCode: number, payload: any): ResponseService {
    return new ResponseService(statusCode, payload);
  }

  parseResponse(): any {
    if (this.isSuccessStatusCode()) {
      return this.getPayload();
    } else {
      const statusCode: number = this.getStatusCode();
      this.checkAuthorizationError(statusCode);

      const {message, ...payload} = this.getPayload();

      if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        throw new ServerError(message, payload);
      } else {
        throw new ClientError(message, payload);
      }
    }
  }

  private isSuccessStatusCode() {
    return this.isSuccessStatus;
  }

  private getStatusCode() {
    return this.statusCode;
  }

  private getPayload() {
    return this.payload;
  }

  private checkAuthorizationError(statusCode: number) {
    if (statusCode === StatusCodes.UNAUTHORIZED) {
      const userLocalStorage: UserLocalStorage = new UserLocalStorageService();

      if (userLocalStorage.exist()) {
        userLocalStorage.removeUser();
        location.replace(location.origin);
      }
    }
  }
}
