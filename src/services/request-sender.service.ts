import { CONTENT_TYPE_HEADER, JSON_CONTENT_TYPE } from '../constants';
import { RequestMethods } from '../../common/constants';
import { Request, RequestSender, Response } from '../types/services.types';
import { ResponseService } from './response.service';

export class RequestSenderService implements RequestSender {
  private request: Request;

  send(request: Request): RequestSender {
    this.request = request;
    return this;
  }

  async get(): Promise<Response> {
    this.request.setMethod(RequestMethods.GET);
    return this.sendRequest();
  }

  async create(): Promise<Response> {
    this.request.setMethod(RequestMethods.POST);
    return this.sendRequest();
  }

  async update(): Promise<Response> {
    this.request.setMethod(RequestMethods.PUT);
    return this.sendRequest();
  }

  async delete(): Promise<Response> {
    this.request.setMethod(RequestMethods.DELETE);
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
    return fetch(this.request.getUrl(), this.request.getOptions());
  }

  private async parseResponse(response: any) {
    let payload: any = {};

    switch (response.headers.get(CONTENT_TYPE_HEADER)) {
      case JSON_CONTENT_TYPE:
        payload = await response.json();
        break;
      default:
        console.log(response);
    }

    const statusCode = response.status;
    return ResponseService.create(statusCode, payload);
  }
}
