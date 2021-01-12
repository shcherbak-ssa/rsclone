import { RequestData } from "../data/request.data";
import { ResponseData } from "../data/response.data";

export interface RequestSender {
  send(requestData: RequestData): RequestSender
  get(): Promise<ResponseData>;
  create(): Promise<ResponseData>;
  update(): Promise<ResponseData>;
  delete(): Promise<ResponseData>;
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
  createRequest(): RequestData;
}
