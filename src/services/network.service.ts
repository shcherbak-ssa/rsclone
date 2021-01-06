import { USER_LOCALSTORAGE_LABEL } from "../constants";
import { AppRoutesService } from "./app-routes.service";
import { LocalStorageService } from "./localstorage.service";

const JSON_CONTENT_TYPE: string = 'application/json';
const NETWORK_ERROR: string = 'NetworkError';
const USER_ID_URL_PARAM_LABEL: string = 'id';

enum Methods {
  GET = 'GET',
  DELETE = 'DELETE',
  EMPTY = '',
};

type FetchRequestType = {
  url: string;
  method: Methods;
  body?: any;
  contentType: string;
};

class FetchRequest {
  private url: string;
  private method: Methods;
  private body?: any;
  private contentType: string;

  constructor(method: Methods, body?: any) {
    this.method = method;
    this.body = body;

    this.createUrl();
    this.setContentType();
  }

  getRequestData(): FetchRequestType {
    return {
      url: this.url,
      method: this.method,
      body: this.body,
      contentType: this.contentType,
    };
  }

  private createUrl() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const urlParams = new URLSearchParams();

    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_LABEL);
    urlParams.append(USER_ID_URL_PARAM_LABEL, localStorageUser.userID);

    const appRoutesService = new AppRoutesService();
    const pathname = appRoutesService.getRootRoutePath();

    this.url = `${pathname}?${urlParams.toString()}`;
  }

  private setContentType() {
    if (typeof this.body === 'object') {
      this.body = JSON.stringify(this.body);
      this.contentType = JSON_CONTENT_TYPE;
    }
  }
}

export class NetworkError implements Error {
  name: string = NETWORK_ERROR;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type NetworkResponse = {
  type: string;
  message: string;
  payload: any;
}

export class NetworkService {
  async get() {
    return await this.sendRequest(Methods.GET);
  }

  async delete() {
    return await this.sendRequest(Methods.DELETE);
  }

  private async sendRequest(method: Methods, body?: any) {
    try {
      const fetchRequest = new FetchRequest(method, body);
      const response = await this.fetchRequest(fetchRequest.getRequestData());

      return await response.json();
    } catch (error) {
      console.log(error);
    }
    
  }

  private async fetchRequest({
    url, method, body, contentType,
  }: FetchRequestType) {
    return fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': contentType,
      }
    });
  }
}
