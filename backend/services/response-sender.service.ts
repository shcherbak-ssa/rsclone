import { Response } from 'express';

import { ResponseFileSender, ResponseSender } from '../types/response-sender.types'; 
import { ResponseData } from '../data/response.data';

export class ResponseSenderService implements ResponseSender, ResponseFileSender {
  private response: Response | null = null;

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
}