export const initialState: AuthStoreState = {
  authError: '',
};

export type AuthStoreState = {
  authError: string,
};

export interface AuthStore {
  setAuthError(authError: string): void;
}
