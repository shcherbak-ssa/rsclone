import { Response } from 'express';
import { ResponseData } from '../data/response.data';

export interface ResponseSender {
  setResponseObject(response: Response): void;
  sendJsonResponse(responseData: ResponseData): void;
  sendFile(statusCode: number, filePath: string): void;
  endRequest(statusCode: number, content: string): void;
}
