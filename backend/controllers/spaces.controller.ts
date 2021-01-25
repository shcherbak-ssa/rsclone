import { StatusCodes } from '../../common/constants';
import { SpacesValidationImpl } from '../validation/spaces.validation';
import { CreatedSpace, NewSpace, Page, Space, UpdatedSpace } from '../../common/entities';
import { BaseController } from './base.controller';
import { SpacesModel } from '../models/spaces.model';
import { ControllerData } from '../types/controller.types';
import { ResponseSender, SpacePathname } from '../types/services.types';
import { SpacePathnameService } from '../services/space-pathname.service';
import { UserDataLabels } from '../constants';
import { PagesModel } from '../models/pages.model';
import { PageAccess, PageAccessCreator } from '../types/pages.types';
import { PageAccessService } from '../services/page-access.service';
import { initialPage } from '../data/page.data';

export interface SpacesValidation {
  validateCreatedSpace(newSpace: NewSpace): Promise<NewSpace>;
  validateUpdatedSpace(updatedSpace: UpdatedSpace): Promise<UpdatedSpace>;
}

export enum SpacesControllerActions {
  CREATE_SPACE = 'create-space',
  UPDATE_SPACE = 'update-space',
  DELETE_SPACE = 'delete-space',
};

export class SpacesController extends BaseController {
  private validation: SpacesValidation;
  private spacesModel: SpacesModel;
  private spacePathname: SpacePathname;
  private pagesModel: PagesModel;

  constructor() {
    super();

    this.validation = new SpacesValidationImpl();
    this.spacesModel = new SpacesModel();
    this.spacePathname = new SpacePathnameService();
    this.pagesModel = new PagesModel();
  }

  async runController(
    action: SpacesControllerActions, {userID, body, responseSender}: ControllerData
  ): Promise<void> {
    try {
      if (!userID) throw this.unknowUserIDError();

      switch (action) {
        case SpacesControllerActions.CREATE_SPACE:
          return await this.createSpace(userID, body, responseSender);
        case SpacesControllerActions.UPDATE_SPACE:
          return await this.updatedSpace(userID, body, responseSender);
        case SpacesControllerActions.DELETE_SPACE:
          return await this.deleteSpace(userID, body, responseSender);
      }
    } catch (error) {
      responseSender.sendErrorResponse(error);
    }
  }

  private async createSpace(
    userID: string, newSpace: NewSpace, responseSender: ResponseSender
  ): Promise<void> {
    newSpace = await this.validation.validateCreatedSpace(newSpace);
    const spacePathname: string = await this.spacePathname.createSpacePathname(userID, newSpace.name);

    const createdSpace: CreatedSpace = {
      ...newSpace,
      [UserDataLabels.SPACE_PATHNAME]: spacePathname,
      [UserDataLabels.SPACE_PAGES]: [],
    };
    const space: Space = await this.spacesModel.createSpace(userID, createdSpace);

    const pageAccessCreator: PageAccessCreator = new PageAccessService();
    pageAccessCreator.setUserID(userID);
    pageAccessCreator.setSpaceID(space.id);

    const pageAccess: PageAccess = pageAccessCreator.getPageAccess();
    const createdInitialPage: Page = await this.pagesModel.createPage(pageAccess, initialPage);

    const updatedSpace: UpdatedSpace = {
      id: space.id,
      updates: {
        [UserDataLabels.SPACE_PAGES]: [
          createdInitialPage.id,
        ],
      },
    };
    await this.spacesModel.updateSpace(userID, updatedSpace);  

    space.pages.push(createdInitialPage.id);
    responseSender.sendSuccessJsonResponse(space, StatusCodes.CREATED);
  }

  private async updatedSpace(
    userID: string, updatedSpace: UpdatedSpace, responseSender: ResponseSender
  ): Promise<void> {
    updatedSpace = await this.validation.validateUpdatedSpace(updatedSpace);

    await this.updateSpacePathname(userID, updatedSpace);
    await this.spacesModel.updateSpace(userID, updatedSpace);

    responseSender.sendSuccessJsonResponse(updatedSpace);
  }

  private async deleteSpace(
    userID: string, {deletedSpaceID}: any, responseSender: ResponseSender
  ): Promise<void> {
    await this.spacesModel.deleteSpace(userID, deletedSpaceID);
    responseSender.sendSuccessJsonResponse({deletedSpaceID});
  }

  private async updateSpacePathname(userID: string, updatedSpace: UpdatedSpace): Promise<void> {
    if (UserDataLabels.SPACE_NAME in updatedSpace.updates) {
      const newSpaceName: string = updatedSpace.updates[UserDataLabels.SPACE_NAME] as string;
      const newSpacePathname: string = await this.spacePathname.createSpacePathname(userID, newSpaceName);

      updatedSpace.updates = {...updatedSpace.updates, [UserDataLabels.SPACE_PATHNAME]: newSpacePathname};
    }
  }
}
