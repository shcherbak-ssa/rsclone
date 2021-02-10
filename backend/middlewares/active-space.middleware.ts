import { NextFunction, Request, Response } from 'express';

import { ResponseSenderService } from '../services/response-sender.service';
import { ResponseSender } from '../types/services.types';
import { MiddlewarePathnames, RequestMethods } from '../../common/constants';
import { BaseMiddleware } from './base.middleware';
import { ControllerData } from '../types/controller.types';
import { SpacesModel } from '../models/spaces.model';

export class ActiveSpaceMiddleware implements BaseMiddleware {
  pathname: string = MiddlewarePathnames.ACTIVE_SPACE;
  method: null = null;

  spacesModel: SpacesModel = new SpacesModel();

  async handler(request: Request, response: Response, next: NextFunction): Promise<void> {
    const controllerData: ControllerData = await this.createControllerData(request, response);
    request.controllerData = controllerData;

    next();
  }

  async createControllerData(request: Request, response: Response): Promise<ControllerData> {
    const responseSender: ResponseSender = this.createResponseSender(response);
    const userID: string | undefined = request.userID;
    const spaceID = await this.getSpaceID(userID || '', request);

    const controllerData: ControllerData = {
      userID,
      spaceID,
      responseSender,
    };

    const {method} = request;
    return (method === RequestMethods.GET)
      ? controllerData
      : {...controllerData, body: request.body};
  }
  
  createResponseSender(response: Response): ResponseSender {
    const responseSender: ResponseSender = new ResponseSenderService();
    responseSender.setResponseObject(response);

    return responseSender;
  }

  async getSpaceID(userID: string, {params: {spacePathname}}: Request): Promise<string> {
    return await this.spacesModel.getSpaceID(userID, spacePathname);
  }
}
