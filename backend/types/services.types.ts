import { Response } from 'express';

export interface ResponseSender {
  setResponseObject(response: Response): void;
  sendErrorResponse(error: Error): Promise<void>;
  sendSuccessJsonResponse(body: any): Promise<void>;
  sendFile(statusCode: number, filePath: string): Promise<void>;
  endRequest(statusCode: number, content: string): Promise<void>;
}
