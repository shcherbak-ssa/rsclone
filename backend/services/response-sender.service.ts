import { Response } from 'express';

import { ResponseSender } from '../types/response-sender.types'; 
import { ResponseData } from '../data/response.data';

export class ResponseSenderService implements ResponseSender {
  private response: Response | null = null;

  static create(response: Response) {
    const responseSender: ResponseSenderService = new ResponseSenderService();
    responseSender.setResponseObject(response);

    return responseSender;
  }

  setResponseObject(response: Response) {
    this.response = response;
  }

  async sendJsonResponse(responseData: ResponseData) {
    if (this.response) {
      this.response
        .status(responseData.getStatusCode())
        .json(responseData.getBody());
    }
  }

  async sendFile(statusCode: number, filePath: string) {
    this.response?.status(statusCode).sendFile(filePath);
  }

  async endRequest(statusCode: number, content: string) {
    this.response?.status(statusCode).end(content);
  }
}
