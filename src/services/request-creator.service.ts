import queryString from 'query-string';

import { RequestHeaders } from '../../common/constants';
import { USER_LOCALSTORAGE_KEY } from '../constants';
import { UserLocalStorageType } from '../types/user.types';
import { RequestModel, RequestOptions } from '../models/request.model';
import { UsernameService } from "./username.service";
import { LocalStorageService } from './localstorage.service';
import { LocalStorage, RequestCreator, Username } from '../types/services.types';

const JSON_CONTENT_TYPE: string = 'application/json';

export class RequestCreatorService implements RequestCreator {
  private url: string = location.origin;
  private queryString: string = '';
  private body?: any;
  private headers: any = {};

  constructor() {
    this.setNecessaryHeaders();
  }

  appendUrlPathname(pathname: string): RequestCreatorService {
    this.url += pathname;
    return this;
  }

  setFullUrl(pathname: string): RequestCreatorService {
    this.addUsernameToUrlPathname();
    this.appendUrlPathname(pathname);

    return this;
  }

  appendUrlQuery(queryObject: any): RequestCreatorService {
    this.queryString = queryString.stringify(queryObject, {
      arrayFormat: 'bracket',
    });

    return this;
  }

  setBody(body: any): RequestCreatorService {
    if (body instanceof FormData) {
      this.body = body;
    } else if (typeof body === 'object') {
      this.body = JSON.stringify(body);
      this.headers[RequestHeaders.CONTENT_TYPE] = JSON_CONTENT_TYPE;
    }

    return this;
  }

  createRequest(): RequestModel {
    const url: string = this.getRequestUrl();
    const options: RequestOptions = this.getRequestOptions();

    return new RequestModel(url, options);
  }

  private setNecessaryHeaders() {
    const localStorageService: LocalStorage = new LocalStorageService();
    const localStorageUser: UserLocalStorageType = localStorageService.get(USER_LOCALSTORAGE_KEY);

    if (localStorageUser) {
      this.headers[RequestHeaders.AUTHORIZATION] = `Basic ${localStorageUser.token}`;
    }

    this.headers[RequestHeaders.REQUEST_FROM_CODE] = 'true';
  }

  private addUsernameToUrlPathname() {
    const usernameService: Username = new UsernameService();
    this.appendUrlPathname(usernameService.getUsernamePathname());
  }

  private getRequestUrl(): string {
    return this.queryString ? `${this.url}?${this.queryString}` : this.url;
  }

  private getRequestOptions(): RequestOptions {
    return {
      method: '',
      headers: this.headers,
      ...this.getBody(),      
    }
  }

  private getBody(): any {
    return this.body ? { body: this.body } : {};
  }
}
