import { LanguageLabels, SpaceColors, Themes } from '../../common/constants';
import { KeyboardShortcut, Space } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { SpacesService } from '../services/spaces.service';
import { Spaces } from './services.types';

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

export type UserStoreState = {
  avatar: string,
  fullname: string,
  username: string,
  email: string,
  password: string,
  newPassword: string,
  language: LanguageLabels,
  theme: Themes,
  shortcuts: KeyboardShortcut[],
  id: string,
  name: string,
  color: SpaceColors,
  logo: string,
};

export type GetUser = {
  user: User,
  spaces: Space[],
};

export type UserDataValue = string | KeyboardShortcut[];

const spacesService: Spaces = new SpacesService();

export const initialState: UserStoreState = {
  [UserDataLabels.AVATAR]: '',
  [UserDataLabels.FULLNAME]: '',
  [UserDataLabels.EMAIL]: '',
  [UserDataLabels.PASSWORD]: '',
  [UserDataLabels.NEW_PASSWORD]: '',
  [UserDataLabels.USERNAME]: '',
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.SHORTCUTS]: [],
  [UserDataLabels.SPACE_ID]: '',
  [UserDataLabels.SPACE_NAME]: '',
  [UserDataLabels.SPACE_COLOR]: spacesService.getRandomColor(),
  [UserDataLabels.SPACE_LOGO]: '',
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
  setActiveSpace(activeSpace: Space): void;
}
