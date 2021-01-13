import { LanguageLabels, Themes } from '../../common/constants';
import { UserDataLabels } from '../constants';

export const initialState: AuthStoreState = {
  authError: '',
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH, 
};

export type AuthStoreState = {
  authError: string,
  [UserDataLabels.THEME]: Themes,
  [UserDataLabels.LANGUAGE]: LanguageLabels,
};

export type AuthUserData = {
  [UserDataLabels.THEME]: Themes,
  [UserDataLabels.LANGUAGE]: LanguageLabels,
};

export interface AuthStore {
  getAuthUserData(): AuthUserData;
  setAuthError(authError: string): void;
  updateTheme(updatedTheme: Themes): void;
  updateLanguage(updatedLanguage: LanguageLabels): void;
}
