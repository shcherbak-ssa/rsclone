import { RequestMethods } from "../constants";
import { Request } from "../data/request.data";

export class RequestService {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  static get(request: Request) {
    request.setMethod(RequestMethods.GET);
    return new RequestService(request);
  }

  static create(request: Request) {
    request.setMethod(RequestMethods.POST);
    return new RequestService(request);
  }

  static update(request: Request) {
    request.setMethod(RequestMethods.PUT);
    return new RequestService(request);
  }

  static delete(request: Request) {
    request.setMethod(RequestMethods.DELETE);
    return new RequestService(request);
  }
  
  async sendRequest() {
    return fetch(this.request.getUrl(), this.request.getOptions());
  }
}
