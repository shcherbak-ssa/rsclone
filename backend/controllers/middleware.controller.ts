import { NextFunction, Request, Response } from 'express';

export interface MiddlewareController {
  pathname: string;
  handler(request: Request, response: Response, next: NextFunction): void;
}
