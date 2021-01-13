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
  addParts(updatedLanguage: LanguageStoreState): void;
};
