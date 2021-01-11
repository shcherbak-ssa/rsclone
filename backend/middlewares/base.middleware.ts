import { NextFunction, Request, Response } from 'express';

export interface BaseMiddleware {
  pathname: string;
  handler(request: Request, response: Response, next: NextFunction): void;
}
