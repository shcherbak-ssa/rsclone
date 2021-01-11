import { Response } from 'express';
import { ClientError } from '../data/errors.data';
import { ResponseData } from '../data/response.data';

export interface ResponseSender {
  setResponseObject(response: Response): void;
  sendErrorResponse(error: Error | ClientError): void;
  sendJsonResponse(responseData: ResponseData): void;
  sendFile(statusCode: number, filePath: string): void;
  endRequest(statusCode: number, content: string): void;
}
