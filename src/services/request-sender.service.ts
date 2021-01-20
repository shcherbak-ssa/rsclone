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
    return this.sendRequest(RequestMethods.GET);
  }

  async create(): Promise<Response> {
    return this.sendRequest(RequestMethods.POST);
  }

  async update(): Promise<Response> {
    return this.sendRequest(RequestMethods.PUT);
  }

  async delete(): Promise<Response> {
    return this.sendRequest(RequestMethods.DELETE);
  }
  
  private async sendRequest(method: RequestMethods) {
    try {
      this.request.setMethod(method);

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

    if (response.headers.get(CONTENT_TYPE_HEADER) === JSON_CONTENT_TYPE) {
      payload = await response.json();
    } else {
      payload = await response.blob();
    }

    const statusCode = response.status;
    return ResponseService.create(statusCode, payload);
  }
}
