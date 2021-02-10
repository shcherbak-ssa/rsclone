import { Request } from 'express';
import { LanguageParts } from '../../common/constants';

export interface StaticEntry {
  isAssetsRequest(request: Request): boolean;
  getEntryFilePath(): string;
}

export interface StaticLanguage {
  readLanguageFile(language: string, languagePart: LanguageParts): Promise<any>;
}
