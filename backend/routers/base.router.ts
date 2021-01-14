import { Request, Response, Router } from 'express';
import { ResponseSenderService } from 'services/response-sender.service';
import { ResponseSender } from 'types/services.types';

export interface BaseRouter {
  initRouter(): Router;
}

export class BaseRouterWorker {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  createResponseSender(response: Response): ResponseSender {
    const responseSender: ResponseSender = new ResponseSenderService();
    responseSender.setResponseObject(response);

    return responseSender;
  }

  getBody(request: Request): any {
    return request.body;
  }
}
