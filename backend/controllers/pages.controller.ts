import { ResponseSender } from '../types/services.types';
import { ControllerData } from '../types/controller.types';
import { BaseController } from './base.controller';
import { ServerError } from '../services/errors.service';
import { Page } from '../../common/entities';
import { PagesModel } from '../models/pages.model';

export enum PagesControllerActions {
  GET_PAGES = 'get-pages',
};

export class PagesController extends BaseController {
  private pagesModel: PagesModel

  constructor() {
    super();
    this.pagesModel = new PagesModel();
  }

  async runController(
    action: PagesControllerActions, {userID, spaceID, body, responseSender}: ControllerData
  ): Promise<void> {
    try {
      if (!userID) throw this.unknowUserIDError();

      if (!spaceID) {
        throw new ServerError(
          'Unknow space id',
          {
            error: 'Some problems with code',
          },
        );
      }

      switch (action) {
        case PagesControllerActions.GET_PAGES:
          return await this.getPages(userID, spaceID, responseSender);
      }
    } catch (error) {
      responseSender.sendErrorResponse(error);
    }
  }

  async getPages(
    userID: string, spaceID: string, responseSender: ResponseSender
  ): Promise<void> {
    const pages: Page[] = await this.pagesModel.getPages(userID, spaceID);
    responseSender.sendSuccessJsonResponse({pages});
  }
}
