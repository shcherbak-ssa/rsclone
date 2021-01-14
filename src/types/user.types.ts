export type UserLocalStorageType = null | {
  token: string;
  username: string;
};

export type User = {
  avatar: boolean;
  fullname: string;
  username: string;
  email: string;
  language: string;
  theme: string;
};

export interface UsersUrlPathname {
  getUsersPathname(): string;
}
