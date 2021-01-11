import { Response } from 'express';

import { ResponseSender } from '../types/response-sender.types'; 
import { ResponseData } from '../data/response.data';
import { ClientError, ServerError } from '../data/errors.data';

export class ResponseSenderService implements ResponseSender {
  private response: Response | null = null;

  setResponseObject(response: Response): void {
    this.response = response;
  }

  async sendJsonResponse(responseData: ResponseData): Promise<void> {
    if (this.response) {
      this.response
        .status(responseData.getStatusCode())
        .json(responseData.getBody());
    }
  }

  async sendErrorResponse(error: Error | ClientError): Promise<void> {
    console.log(`${error.name}: ${error.message}`);

    if (error instanceof ClientError) {
      return this.sendJsonResponse(error.getResponseData());
    }

    console.log(error); // @todo: add logger
    const serverError: ServerError = new ServerError(error.message, {});
    this.sendJsonResponse(serverError.getResponseData());
  }

  async sendFile(statusCode: number, filePath: string): Promise<void> {
    this.response?.status(statusCode).sendFile(filePath);
  }

  async endRequest(statusCode: number, content: string): Promise<void> {
    this.response?.status(statusCode).end(content);
  }
}
