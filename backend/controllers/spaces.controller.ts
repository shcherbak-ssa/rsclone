import { StatusCodes } from '../../common/constants';
import { SpacesValidationImpl } from '../validation/spaces.validation';
import { NewSpace, Space, UpdatedSpace } from '../../common/entities';
import { BaseController } from './base.controller';
import { SpacesModel } from '../models/spaces.model';
import { ControllerData } from '../types/controller.types';
import { ResponseSender } from '../types/services.types';

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

  constructor() {
    super();

    this.validation = new SpacesValidationImpl();
    this.spacesModel = new SpacesModel();
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
    const space: Space = await this.spacesModel.createSpace(userID, newSpace);

    responseSender.sendSuccessJsonResponse(space, StatusCodes.CREATED);
  }

  private async updatedSpace(
    userID: string, updatedSpace: UpdatedSpace, responseSender: ResponseSender
  ): Promise<void> {
    updatedSpace = await this.validation.validateUpdatedSpace(updatedSpace);
    await this.spacesModel.updateSpace(userID, updatedSpace);

    responseSender.sendSuccessJsonResponse(updatedSpace);
  }

  private async deleteSpace(
    userID: string, {deletedSpaceID}: any, responseSender: ResponseSender
  ): Promise<void> {
    await this.spacesModel.deleteSpace(userID, deletedSpaceID);
    responseSender.sendSuccessJsonResponse({deletedSpaceID});
  }
}
