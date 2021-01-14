import { RequestModel } from "../models/request.model";
import { ResponseModel } from "../models/response.model";
import { UserLocalStorageType } from "./user.types";

export interface RequestCreator {
  appendUrlPathname(pathname: string): RequestCreator;
  appendUrlQuery(queryObject: any): RequestCreator;
  setBody(body: any): RequestCreator;
  createRequest(): RequestModel;
}

export interface RequestSender {
  send(requestModel: RequestModel): RequestSender;
  get(): Promise<ResponseModel>;
  create(): Promise<ResponseModel>;
  update(): Promise<ResponseModel>;
  delete(): Promise<ResponseModel>;
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
}

export interface UserLocalStorage {
  exist(): boolean;
  getToken(): string;
  getUsername(): string;
  saveUser(user: UserLocalStorageType): void;
  removeUser(): void;
}
