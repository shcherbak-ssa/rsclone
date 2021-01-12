import { LanguageLabels, LanguageParts } from "../../common/constants";

export type UpdateLanguage = {
  language: LanguageLabels;
  languageParts: LanguageParts[];
};
