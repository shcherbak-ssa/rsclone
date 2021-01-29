import { PagePathname, ResponseSender } from '../types/services.types';
import { ControllerData } from '../types/controller.types';
import { BaseController } from './base.controller';
import { ServerError } from '../services/errors.service';
import { Page } from '../../common/entities';
import { PagesModel } from '../models/pages.model';
import { NewPage, PageAccess, PageAccessCreator } from '../types/pages.types';
import { PageAccessService } from '../services/page-access.service';
import { StatusCodes } from '../../common/constants';
import { PagePathnameService } from '../services/page-pathname.service';

export enum PagesControllerActions {
  GET_PAGES = 'get-pages',
  CREATE_PAGE = 'create-page',
};

export class PagesController extends BaseController {
  private pagesModel: PagesModel;
  private pagePathname: PagePathname;

  constructor() {
    super();

    this.pagesModel = new PagesModel();
    this.pagePathname = new PagePathnameService();
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
        case PagesControllerActions.CREATE_PAGE:
          return await this.createPage(userID, spaceID, body, responseSender);
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

  async createPage(
    userID: string, spaceID: string, {newPageTitle}: any, responseSender: ResponseSender
  ): Promise<void> {
    const pageAccessCreator: PageAccessCreator = new PageAccessService();
    pageAccessCreator.setUserID(userID);
    pageAccessCreator.setSpaceID(spaceID);

    const pageAccess: PageAccess = pageAccessCreator.getPageAccess();
    const pagePathname: string
      = await this.pagePathname.createPagePathname(userID, spaceID, newPageTitle);

    const newPage: NewPage = this.createNewPage(newPageTitle, pagePathname);
    const createdNewPage: Page = await this.pagesModel.createPage(pageAccess, newPage);

    responseSender.sendSuccessJsonResponse({...createdNewPage}, StatusCodes.CREATED);
  }

  private createNewPage(newPageTitle: string, pagePathname: string): NewPage {
    return {
      title: newPageTitle,
      description: '',
      pathname: pagePathname,
      nodes: [],
    };
  }
}
