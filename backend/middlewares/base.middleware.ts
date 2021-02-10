import { NextFunction, Request, Response } from 'express';

export interface BaseMiddleware {
  pathname: string;
  method: string | null;
  handler(request: Request, response: Response, next: NextFunction): void;
}
