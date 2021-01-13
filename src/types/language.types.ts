import { LanguageLabels, LanguageParts } from "../../common/constants";

export const initialState: LanguageStoreState = {};

export type LanguageStoreState = {
  [key: string]: any;
};

export type RequestedLanguage = {
  language: LanguageLabels;
  languageParts: LanguageParts[];
};

export interface LanguageStore {
  getParts(): LanguageParts[];
  changeLanguage(changedLanguage: LanguageStoreState): void;
  addParts(updatedLanguage: LanguageStoreState): void;
};
