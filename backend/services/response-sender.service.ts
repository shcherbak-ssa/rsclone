import { Response } from 'express';

import { ResponseData, ResponseSender } from '../data/response.data';

export class ResponseSenderService implements ResponseSender {
  private response: Response | null = null;

  setResponseObject(response: Response) {
    this.response = response;
  }

  async sendJsonResponse(responseData: ResponseData) {}
}
