export type RequestOptions = {
  method: string;
  body?: any;
  headers: any;
};

export class RequestData {
  private url: string;
  private options: RequestOptions;

  constructor(url: string, options: RequestOptions) {
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
