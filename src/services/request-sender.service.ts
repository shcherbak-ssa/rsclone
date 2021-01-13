import { RequestMethods } from '../../common/constants';
import { RequestModel } from '../models/request.model';
import { ResponseModel } from '../models/response.model';
import { RequestSender } from '../types/services.types';

export class RequestSenderService implements RequestSender {
  private requestModel: RequestModel;

  send(requestModel: RequestModel): RequestSender {
    this.requestModel = requestModel;
    return this;
  }

  async get(): Promise<ResponseModel> {
    this.requestModel.setMethod(RequestMethods.GET);
    return this.sendRequest();
  }

  async create(): Promise<ResponseModel> {
    this.requestModel.setMethod(RequestMethods.POST);
    return this.sendRequest();
  }

  async update(): Promise<ResponseModel> {
    this.requestModel.setMethod(RequestMethods.PUT);
    return this.sendRequest();
  }

  async delete(): Promise<ResponseModel> {
    this.requestModel.setMethod(RequestMethods.DELETE);
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
    return fetch(this.requestModel.getUrl(), this.requestModel.getOptions());
  }

  private async parseResponse(response: Response) {
    const statusCode = response.status;
    const payload: any = await response.json();
    return ResponseModel.create(statusCode, payload);
  }
}
