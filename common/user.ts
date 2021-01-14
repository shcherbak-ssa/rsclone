import { LanguageLabels, Themes } from './constants';

export type RegistrationUser = {
  fullname: string,
  email: string,
  password: string,
  language: LanguageLabels,
  theme: Themes
};
