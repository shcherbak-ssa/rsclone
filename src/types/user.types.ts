import { LanguageLabels, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';

export type UserLocalStorageType = null | {
  token: string;
  username: string;
};

export type User = {
  avatar: boolean,
  fullname: string,
  username: string,
  email: string,
  language: LanguageLabels,
  theme: Themes,
  shortcuts: KeyboardShortcut[],
};

export type GetUser = {
  user: User,
  spaces: Space[],
};

export interface UsersUrlPathname {
  getUsersPathname(): string;
}
