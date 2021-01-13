import { LanguageLabels, Themes } from "../../common/constants";
import { UserDataLabels } from "../constants";

export const initialState: AuthStoreState = {
  authError: '',
  user: {
    [UserDataLabels.FULLNAME]: '',
    [UserDataLabels.EMAIL]: '',
    [UserDataLabels.PASSWORD]: '',
    [UserDataLabels.THEME]: Themes.ORIGINAL,
    [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,    
  },
};

export type AuthUserStoreState = {
  [UserDataLabels.FULLNAME]: string,
  [UserDataLabels.EMAIL]: string,
  [UserDataLabels.PASSWORD]: string,
  [UserDataLabels.THEME]: Themes,
  [UserDataLabels.LANGUAGE]: LanguageLabels,
};

export type AuthStoreState = {
  authError: string,
  user: AuthUserStoreState,
};

export type AuthUserValue = string | Themes | LanguageLabels;

export type UpdatedAuthUserValue = {
  value: AuthUserValue,
  dataLabel: UserDataLabels,
};

export type UpdatedAuthUserData = {
  [key: string]: AuthUserValue;
};

export interface AuthStore {
  getRegistrationData(): AuthUserStoreState;
  getLoginData(): AuthUserStoreState;
  setAuthError(authError: string): void;
  updateUserData(updatedData: UpdatedAuthUserData): void;
}
