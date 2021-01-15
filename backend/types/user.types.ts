import { LanguageLabels, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';

export type VerifyUser = {
  username: string;
  userID: string;
};

export type AccessUser = {
  username: string,
  token: string,
};

export type User = {
  fullname: string;
  email: string;
  password: string;
  username: string;
  avatar: boolean;
  language: LanguageLabels;
  theme: Themes;
  shortcuts: KeyboardShortcut[];
};

export type RegistrationUser = {
  fullname: string,
  email: string,
  password: string,
  language: LanguageLabels,
  theme: Themes
};

export type LoginUser = {
  email: string,
  password: string,
  language: LanguageLabels,
  theme: Themes
};

export type GetUser = {
  user: User,
  spaces: Space[],
};
