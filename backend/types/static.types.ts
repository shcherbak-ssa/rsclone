import { Request } from 'express';

export interface StaticEntryMiddleware {
  isAssetsRequest(request: Request): boolean;
  getRootFilePath(): string;
}
