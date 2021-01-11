import { RequestHeaders } from '../../common/constants';
import { USER_LOCALSTORAGE_KEY } from '../constants';
import { UserLocalStorageType } from '../types/user.types';
import { UsernameService } from "../services/username.service";
import { LocalStorageService } from '../services/localstorage.service';

const JSON_CONTENT_TYPE: string = 'application/json';

type RequestType = {
  method: string;
  body?: any;
  headers: any;
};

export class RequestData {
  private url: string;
  private options: RequestType;

  constructor(url: string, options: RequestType) {
    this.url = url;
    this.options = options;
  }

  setMethod(method: string) {
    this.options.method = method;
  }

  getUrl() {
    return this.url;
  }

  getOptions() {
    return {...this.options};
  }
}

export class RequestCreator {
  private url: string = location.origin;
  private body?: any;
  private headers: any = {};

  constructor() {
    this.setNecessaryHeaders();
  }

  appendUrlPathname(pathname: string) {
    this.url += pathname;
  }

  setFullUrl(pathname: string) {
    this.addUsernameToUrlPathname();
    this.appendUrlPathname(pathname);
  }

  setBody(body: any) {
    if (body instanceof FormData) {
      this.body = body;
      return;
    }
    
    if (typeof body === 'object') {
      this.body = JSON.stringify(body);
      this.headers[RequestHeaders.CONTENT_TYPE] = JSON_CONTENT_TYPE;
    }
  }

  createRequest() {
    const body = this.body ? { body: this.body } : {};

    return new RequestData(this.url, {
      method: '',
      headers: this.headers,
      ...body,      
    });
  }

  private setNecessaryHeaders() {
    const localStorageService = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    if (localStorageUser) {
      this.headers[RequestHeaders.AUTHORIZATION] = `Basic ${localStorageUser.token}`;
    }

    this.headers[RequestHeaders.REQUEST_FROM_CODE] = 'true';
  }

  private addUsernameToUrlPathname() {
    const usernameService = new UsernameService();
    this.appendUrlPathname(usernameService.getUsernamePathname());
  }
}
