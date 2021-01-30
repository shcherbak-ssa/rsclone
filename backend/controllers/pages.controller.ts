import { PagePathname, ResponseSender } from '../types/services.types';
import { ControllerData } from '../types/controller.types';
import { BaseController } from './base.controller';
import { ServerError } from '../services/errors.service';
import { Page, UpdatedSpace, UpdatedPage } from '../../common/entities';
import { PagesModel } from '../models/pages.model';
import { NewPage, PageAccess, PageAccessCreator } from '../types/pages.types';
import { PageAccessService } from '../services/page-access.service';
import { StatusCodes } from '../../common/constants';
import { PagePathnameService } from '../services/page-pathname.service';
import { SpacesModel } from '../models/spaces.model';
import { EMPTY_STRING, UserDataLabels } from '../constants';
import { PagesValidationImpl } from '../validation/pages.validation';

export interface PagesValidation {
  validateUpdatedPage(updatedPage: UpdatedPage): Promise<UpdatedPage>;
}

export enum PagesControllerActions {
  GET_PAGES = 'get-pages',
  CREATE_PAGE = 'create-page',
  UPDATE_PAGE = 'update-page',
  DELETE_PAGE = 'delete-page',
};

export class PagesController extends BaseController {
  private pagesModel: PagesModel;
  private pagePathname: PagePathname;
  private spacesModel: SpacesModel;
  private validation: PagesValidation;

  constructor() {
    super();

    this.pagesModel = new PagesModel();
    this.pagePathname = new PagePathnameService();
    this.spacesModel = new SpacesModel();
    this.validation = new PagesValidationImpl();
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
        case PagesControllerActions.UPDATE_PAGE:
          return await this.updatePage(userID, spaceID, body, responseSender);
        case PagesControllerActions.DELETE_PAGE:
          return await this.deletePage(userID, spaceID, body, responseSender);
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
    const pageAccess: PageAccess = this.createPageAccess(userID, spaceID);
    const pagePathname: string
      = await this.pagePathname.createPagePathname(userID, spaceID, newPageTitle);

    const newPage: NewPage = this.createNewPage(newPageTitle, pagePathname);
    const createdNewPage: Page = await this.pagesModel.createPage(pageAccess, newPage);

    await this.updateSpacePageIDs(userID, spaceID, (spacePageIDs: string[]) => {
      return [...spacePageIDs, createdNewPage.id];
    });

    responseSender.sendSuccessJsonResponse({...createdNewPage}, StatusCodes.CREATED);
  }

  async updatePage(
    userID: string, spaceID: string, updatedPage: UpdatedPage, responseSender: ResponseSender
  ): Promise<void> {
    updatedPage = await this.validation.validateUpdatedPage(updatedPage);
    const pageAccess: PageAccess = this.createPageAccess(userID, spaceID, updatedPage.id);

    if (UserDataLabels.PAGE_TITLE in updatedPage) {
      const updatedPageTitle = updatedPage.updates[UserDataLabels.PAGE_TITLE] as string;
      const updatedPagePathname: string
        = await this.pagePathname.createPagePathname(userID, spaceID, updatedPageTitle);

      updatedPage.updates[UserDataLabels.PAGE_PATHNAME] = updatedPagePathname;
    }

    await this.pagesModel.updatePage(pageAccess, updatedPage);
    await this.updateSpaceLastUpdated(userID, spaceID);

    responseSender.sendSuccessJsonResponse(updatedPage);
  }

  async deletePage(
    userID: string, spaceID: string, {deletePageID}: any, responseSender: ResponseSender
  ): Promise<void> {
    const pageAccess: PageAccess = this.createPageAccess(userID, spaceID, deletePageID);
    await this.pagesModel.deletePage(pageAccess);

    await this.updateSpacePageIDs(userID, spaceID, (spacePageIDs: string[]) => {
      return spacePageIDs.filter((pageID) => pageID !== deletePageID);
    });

    responseSender.sendSuccessJsonResponse({deleted: true});
  }

  private createPageAccess(userID: string, spaceID: string, pageID?: string): PageAccess {
    const pageAccessCreator: PageAccessCreator = new PageAccessService();

    return pageAccessCreator
      .setUserID(userID)
      .setSpaceID(spaceID)
      .setPageID(pageID || EMPTY_STRING)
      .getPageAccess();
  }

  private createNewPage(newPageTitle: string, pagePathname: string): NewPage {
    return {
      title: newPageTitle,
      description: '',
      pathname: pagePathname,
      nodes: [],
    };
  }

  private async updateSpacePageIDs(
    userID: string, spaceID: string, updatingFunction: Function,
  ): Promise<void> {
    const spacePageIDs: string[] = await this.spacesModel.getSpacePageIDs(userID, spaceID);
    const updatedSpace: UpdatedSpace = {
      id: spaceID,
      updates: {
        [UserDataLabels.SPACE_PAGES]: updatingFunction(spacePageIDs),
        [UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
      },
    };

    this.spacesModel.updateSpace(userID, updatedSpace);
  }

  private async updateSpaceLastUpdated(userID: string, spaceID: string): Promise<void> {
    const updatedSpace: UpdatedSpace = {
      id: spaceID,
      updates: {
        [UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
      },
    };

    this.spacesModel.updateSpace(userID, updatedSpace);
  }
}
