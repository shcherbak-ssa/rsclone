import { Request } from 'express';

export interface StaticEntry {
  isAssetsRequest(request: Request): boolean;
  getRootFilePath(): string;
}

export interface StaticLanguage {
  createLanguageFilePath(): string;
}
