import { NextFunction, Request, Response } from 'express';

import { MiddlewarePathnames, RequestMethods } from '../../common/constants';
import { ResponseSenderService } from '../services/response-sender.service';
import { ControllerData } from '../types/controller.types';
import { ResponseSender } from '../types/services.types';
import { BaseMiddleware } from './base.middleware';

export class ControllerMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.CONTROLLER;
  method: null = null;

  async handler(request: Request, response: Response, next: NextFunction): Promise<void> {
    const controllerData: ControllerData = this.createControllerData(request, response);
    request.controllerData = controllerData;

    next();
  }

  createControllerData(request: Request, response: Response): ControllerData {
    const responseSender: ResponseSender = this.createResponseSender(response);
    const userID: string | undefined = request.userID;

    if (request.method === RequestMethods.GET) {
      return {userID, responseSender};
    }

    const body: any = this.getBody(request);
    return {body, userID, responseSender};
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