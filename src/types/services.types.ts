import { LanguageLabels, SpaceColors } from "../../common/constants";
import { UserLocalStorageType } from "./user.types";

export interface Response {
  parseResponse(): any;
}

export interface Request {
  setMethod(method: string): void;
  getUrl(): string;
  getOptions(): any;
}

export interface RequestCreator {
  appendUrlPathname(pathname: string): RequestCreator;
  appendUrlQuery(queryObject: any): RequestCreator;
  setBody(body: any): RequestCreator;
  createRequest(): Request;
}

export interface RequestSender {
  send(request: Request): RequestSender;
  get(): Promise<Response>;
  create(): Promise<Response>;
  update(): Promise<Response>;
  delete(): Promise<Response>;
}

export interface Controller {
  on(event: string, handler: Function): Controller;
  once(event: string, handler: Function): Controller;
  off(event: string, handler: Function): Controller;
  emit(event: string, payload?: any): void;
}

export interface AppRoutes {
  getRootRoutePath(): string;
  getSpacesRoutePath(): string;
  getSettingsRoutePath(): string;
  getSpacePageRoutePath(spacePathname: string): string;
  getActivePageRoutePath(spacePathname: string, pagePathname: string): string;
}

export interface UserLocalStorage {
  exist(): boolean;
  getToken(): string;
  getUsername(): string;
  saveUser(user: UserLocalStorageType): void;
  removeUser(): void;
}

export interface Logout {
  logoutUser(): void;
}

export interface UsersUrlPathname {
  getUsersPathname(): string;
  getAvatarsPathname(): string;
  getSpacesPathname(): string;
  getLanguagePathname(language: LanguageLabels): string;
  getPagesPathname(spacePathname: string): string;
}

export interface Spaces {
  setInitialRandomSpaceLogo(): void;
  getRandomColor(): SpaceColors;
}

export interface Emoji {
  loadSpacesEmojis(): Promise<void>;
}
