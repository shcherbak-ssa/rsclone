import { Response } from 'express';
import { JsonResponse } from '../models/response.model';

const SUCCESS_STATUS_CODE: number = 200;
const BAD_REQUEST_CODE: number = 400;

class ResponseService {
  async sendSuccessResponseJson(res: Response, responseJson: JsonResponse) {
    res.status(SUCCESS_STATUS_CODE).json(responseJson);
  }

  async sendErrorResponseJson(res: Response, responseJson: JsonResponse) {
    res.status(SUCCESS_STATUS_CODE).json(responseJson);
  }

  async sendSuccessResponseFile(res: Response, filename: string) {
    res.status(SUCCESS_STATUS_CODE).sendFile(filename);
  }
}

export const responseService: ResponseService = new ResponseService();
