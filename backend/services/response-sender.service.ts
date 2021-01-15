import { Response } from 'express';

import { ResponseSender } from '../types/services.types'; 
import { ResponseService } from './response.service';
import { ClientError, ServerError } from './errors.service';
import { StatusCodes } from '../../common/constants';
import { ValidationError, ValidationErrorPayload } from '../../common/validation';

export class ResponseSenderService implements ResponseSender {
  private response: Response | null = null;

  setResponseObject(response: Response): void {
    this.response = response;
  }

  async sendSuccessJsonResponse(
    body: any, statusCode: number = StatusCodes.SUCCESS
  ): Promise<void> {
    this.sendJsonResponse(statusCode, body);
  }

  async sendErrorResponse(error: Error): Promise<void> {
    console.log(`${error.name}: ${error.message}`);

    if (error instanceof ClientError) {
      const responseService: ResponseService = error.getResponse();

      return this.sendJsonResponse(
        responseService.getStatusCode(),
        responseService.getBody(),
      );
    }

    if (error instanceof ValidationError) {
      const payload: ValidationErrorPayload = error.payload;
      return this.sendJsonResponse(StatusCodes.BAD_REQUEST, payload);
    }

    console.log(error); // @todo: add logger
    const serverError: ServerError = new ServerError(error.message, {});
    const responseService: ResponseService = serverError.getResponse();

    this.sendJsonResponse(
      responseService.getStatusCode(),
      responseService.getBody(),
    );
  }

  async sendFile(statusCode: number, filePath: string): Promise<void> {
    this.response?.status(statusCode).sendFile(filePath);
  }

  async endRequest(statusCode: number, content: string): Promise<void> {
    this.response?.status(statusCode).end(content);
  }

  private async sendJsonResponse(statusCode: number, body: any): Promise<void> {
    this.response?.status(statusCode).json(body);
  }
}
