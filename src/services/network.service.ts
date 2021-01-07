import { USER_LOCALSTORAGE_LABEL } from "../constants";
import { LocalStorageService } from "./localstorage.service";

const JSON_CONTENT_TYPE: string = 'application/json';
const NETWORK_ERROR: string = 'NetworkError';
const USER_ID_URL_PARAM_LABEL: string = 'id';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
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

  setUrl(url: string) {
    this.createUrl(url);
  }

  getRequestData(): FetchRequestType {
    return {
      url: this.url,
      method: this.method,
      body: this.body,
      contentType: this.contentType,
    };
  }

  private createUrl(url?: string) {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const urlParams = new URLSearchParams();

    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_LABEL);
    urlParams.append(USER_ID_URL_PARAM_LABEL, localStorageUser.userID);

    this.url = `${url || location.pathname}?${urlParams.toString()}`;
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
  async get(url?: string) {
    const fetchRequest = new FetchRequest(Methods.GET);
    
    if (url) {
      fetchRequest.setUrl(url);
    }

    return await this.sendRequest(fetchRequest);
  }

  async create(body: any) {
    const fetchRequest = new FetchRequest(Methods.POST, body);
    return await this.sendRequest(fetchRequest);
  }

  async update(body: any) {
    const fetchRequest = new FetchRequest(Methods.PUT, body);
    return await this.sendRequest(fetchRequest);
  }

  async delete() {
    const fetchRequest = new FetchRequest(Methods.DELETE);
    return await this.sendRequest(fetchRequest);
  }

  private async sendRequest(fetchRequest: FetchRequest) {
    try {
      const requestData = fetchRequest.getRequestData();
      const response = await this.fetchRequest(requestData);
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
