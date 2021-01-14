import queryString from 'query-string';

import { RequestHeaders } from '../../common/constants';
import { RequestService, RequestOptions } from './request.service';
import { RequestCreator, UserLocalStorage } from '../types/services.types';
import { UserLocalStorageService } from './user-local-storage.service';

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

  createRequest(): RequestService {
    const url: string = this.getRequestUrl();
    const options: RequestOptions = this.getRequestOptions();

    return new RequestService(url, options);
  }

  private setNecessaryHeaders() {
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();

    if (userLocalStorage.exist()) {
      this.headers[RequestHeaders.AUTHORIZATION] = `Basic ${userLocalStorage.getToken()}`;
    }

    this.headers[RequestHeaders.REQUEST_FROM_CODE] = 'true';
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
