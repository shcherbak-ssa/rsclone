import { Response } from 'express';
import { responseService } from '../services/response.service';

const RESPONSE_ERROR_TYPE: string = 'error';
const RESPONSE_SUCCESS_TYPE: string = 'success';

export interface JsonResponse {
  type: string;
  message: string;
  payload: any;
}

class ResponseImpl implements JsonResponse {
  type: string = '';
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}

class ErrorResponse extends ResponseImpl {
  type: string = RESPONSE_ERROR_TYPE;
}

class SuccessResponse extends ResponseImpl {
  type: string = RESPONSE_SUCCESS_TYPE;
}

export class ResponseSender {
  res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  async sendSuccessResponse(message: string, payload: any) {
    const successResponse: JsonResponse = new SuccessResponse(message, payload);
    responseService.sendSuccessResponseJson(this.res, successResponse);
  }

  async sendErrorResponse(message: string, payload: any) {
    const errorResponse: JsonResponse = new ErrorResponse(message, payload);
    responseService.sendErrorResponseJson(this.res, errorResponse);
  }
}
