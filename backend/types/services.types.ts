import { Response } from 'express';

export interface ResponseSender {
  setResponseObject(response: Response): void;
  sendErrorResponse(error: Error): Promise<void>;
  sendSuccessJsonResponse(body: any, statusCode?: number): Promise<void>;
  sendFile(statusCode: number, filePath: string): Promise<void>;
  endRequest(statusCode: number, content: string): Promise<void>;
}

export interface Username {
  createUsername(email: string): Promise<string>;
}

export interface UserFiles {
  deleteUserFilesFolder(userID: string): Promise<void>;
}
