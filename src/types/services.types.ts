import { RequestModel } from "../models/request.model";
import { ResponseModel } from "../models/response.model";

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

export interface Username {
  getUsernamePathname(): string;
}

export interface LocalStorage {
  save(storageLabel: string, payload: object): void;
  remove(storageLabel: string): void;
  get(storageLabel: string): any | null;
}

export interface RequestCreator {
  appendUrlPathname(pathname: string): void;
  setFullUrl(pathname: string): void;
  appendUrlQuery(queryObject: any): void;
  setBody(body: any): void;
  createRequest(): RequestModel;
}
