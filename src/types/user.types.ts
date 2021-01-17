import { LanguageLabels, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';

export type UserLocalStorageType = null | {
  token: string;
  username: string;
};

export type User = {
  avatar: string,
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

export type UserDataValue = string | KeyboardShortcut[];

export const initialState: User = {
  avatar: '',
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

export type UpdatedData = {
  [key: string]: string,
};

export interface UserStore {
  getStates(): User;
  updateStates(updatedStates: UpdatedStates): void;
  setStates(user: User): void;
}
