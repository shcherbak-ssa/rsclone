import { RequestMethods } from "../constants";
import { RequestData } from "../data/request.data";
import { ResponseData } from "../data/response.data";

export class RequestService {
  private requestData: RequestData;

  constructor(requestData: RequestData) {
    this.requestData = requestData;
  }

  static get(requestData: RequestData) {
    requestData.setMethod(RequestMethods.GET);
    return new RequestService(requestData);
  }

  static create(requestData: RequestData) {
    requestData.setMethod(RequestMethods.POST);
    return new RequestService(requestData);
  }

  static update(requestData: RequestData) {
    requestData.setMethod(RequestMethods.PUT);
    return new RequestService(requestData);
  }

  static delete(requestData: RequestData) {
    requestData.setMethod(RequestMethods.DELETE);
    return new RequestService(requestData);
  }
  
  async sendRequest() {
    try {
      const response = await fetch(this.requestData.getUrl(), this.requestData.getOptions());
      return await this.parseResponse(response);
    } catch (error) {
      console.error(error.name);
    }
  }

  private async parseResponse(response: Response) {
    const statusCode = response.status;
    const payload: any = await response.json();
    return ResponseData.create(statusCode, payload);
  }
}
