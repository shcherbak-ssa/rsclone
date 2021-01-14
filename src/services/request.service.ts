import { Request } from '../types/services.types';

export type RequestOptions = {
  method: string;
  body?: any;
  headers: any;
};

export class RequestService implements Request {
  private url: string;
  private options: RequestOptions;

  constructor(url: string, options: RequestOptions) {
    this.url = url;
    this.options = options;
  }

  setMethod(method: string): void {
    this.options.method = method;
  }

  getUrl(): string {
    return this.url;
  }

  getOptions(): any {
    return {...this.options};
  }
}
