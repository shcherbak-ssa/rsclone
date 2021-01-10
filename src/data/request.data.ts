import { UsernameService } from "../services/username.service";

type RequestType = {
  method: string;
  body?: any;
  headers: any;
};

export class Request {
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
  private headers: Map<string, string> = new Map();

  appendUrlPathname(pathname: string) {
    this.url += pathname;
  }

  addUsernamePathname() {
    const usernameService = new UsernameService();
    this.appendUrlPathname(usernameService.getUsernamePathname());
  }

  createRequest() {
    const body = this.body ? { body: this.body } : {};
    const headers = Object.fromEntries(this.headers.entries());

    return new Request(this.url, {
      method: '',
      headers,
      ...body,      
    });
  }
}
