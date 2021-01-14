import { LanguageLabels, Themes } from '../../common/constants';

export type VerifyUser = {
  username: string;
  userID: string;
};

export type CreatedUser = {
  username: string,
  token: string,
};

export type KeyboardShortcutType = {
  section: string,
  keys: string,
  label: string,
};

export type User = {
  fullname: string;
  email: string;
  password: string;
  username: string;
  avatar: boolean;
  language: LanguageLabels;
  theme: Themes;
  shortcuts: KeyboardShortcutType[];
};

export interface GetUserDatabase {
  getUsername(userID: string): Promise<string>;
}
