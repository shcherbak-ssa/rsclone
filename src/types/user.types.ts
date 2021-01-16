import { LanguageLabels, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';
import { UserDataLabels } from '../constants';

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

export type UserDataValue = string | boolean | KeyboardShortcut[];

export const initialState: User = {
  avatar: false,
  fullname: '',
  username: '',
  email: '',
  language: LanguageLabels.ENGLISH,
  theme: Themes.ORIGINAL,
  shortcuts: [],
};

export type UpdatedStates = {
  [key: string]: UserDataValue,
};

export interface UserStore {
  updateStates(updatedStates: UpdatedStates): void;
  setStates(user: User): void;
}
