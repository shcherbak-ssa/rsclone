import { LanguageLabels, SpaceColors, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';
import { UserDataLabels } from '../constants';

export type UserLocalStorageType = null | {
  token: string;
  username: string;
};

export type User = {
  avatar: string,
  fullname: string,
  username: string,
  email: string,
  password: string,
  newPassword: string,
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
  [UserDataLabels.AVATAR]: '',
  [UserDataLabels.FULLNAME]: '',
  [UserDataLabels.EMAIL]: '',
  [UserDataLabels.PASSWORD]: '',
  [UserDataLabels.NEW_PASSWORD]: '',
  [UserDataLabels.USERNAME]: '',
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.SHORTCUTS]: [],
};

export type UpdatedStates = {
  [key: string]: UserDataValue,
};

export type UpdatedData = {
  [key: string]: string,
};

export interface UserStore {
  getState(dataLabel: UserDataLabels): UserDataValue;
  getStates(): User;
  updateStates(updatedStates: UpdatedStates): void;
  setStates(user: User): void;
}
