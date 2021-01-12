import { RequestMethods } from '../../common/constants';
import { RequestData } from '../data/request.data';
import { ResponseData } from '../data/response.data';
import { RequestSender } from '../types/services.types';

export class RequestSenderService implements RequestSender {
  private requestData: RequestData;

  send(requestData: RequestData): RequestSender {
    this.requestData = requestData;
    return this;
  }

  async get(): Promise<ResponseData> {
    this.requestData.setMethod(RequestMethods.GET);
    return this.sendRequest();
  }

  async create(): Promise<ResponseData> {
    this.requestData.setMethod(RequestMethods.POST);
    return this.sendRequest();
  }

  async update(): Promise<ResponseData> {
    this.requestData.setMethod(RequestMethods.PUT);
    return this.sendRequest();
  }

  async delete(): Promise<ResponseData> {
    this.requestData.setMethod(RequestMethods.DELETE);
    return this.sendRequest();
  }
  
  private async sendRequest() {
    try {
      const response = await this.sendFetchRequest();
      return await this.parseResponse(response);
    } catch (error) {
      console.error(error);
    }
  }

  private async sendFetchRequest() {
    return fetch(this.requestData.getUrl(), this.requestData.getOptions());
  }

  private async parseResponse(response: Response) {
    const statusCode = response.status;
    const payload: any = await response.json();
    return ResponseData.create(statusCode, payload);
  }
}
