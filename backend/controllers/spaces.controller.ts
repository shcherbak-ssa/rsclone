import { StatusCodes } from '../../common/constants';
import { SpacesValidationImpl } from '../validation/spaces.validation';
import { NewSpace, Space } from '../../common/entities';
import { BaseController } from './base.controller';
import { SpacesModel } from '../models/spaces.model';
import { ControllerData } from '../types/controller.types';

export interface SpacesValidation {
  validateCreatedSpace(newSpace: NewSpace): Promise<NewSpace>;
}

export enum SpacesControllerActions {
  CREATE_SPACE = 'create-space',
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
    action: SpacesControllerActions, controllerData: ControllerData
  ): Promise<void> {
    const {responseSender} = controllerData;
    const actionResult: any = await super.runController(action, controllerData);

    if (actionResult !== null) {
      if (action === SpacesControllerActions.CREATE_SPACE) {
        responseSender.sendSuccessJsonResponse(actionResult, StatusCodes.CREATED);
      } else {
        responseSender.sendSuccessJsonResponse(actionResult);
      }
    }
  }

  protected async doAction(
    action: SpacesControllerActions, userID: string, body: any
  ): Promise<any> {
    switch (action) {
      case SpacesControllerActions.CREATE_SPACE:
        return await this.createSpace(userID, body);
    }
  }

  private async createSpace(userID: string, newSpace: NewSpace): Promise<Space> {
    newSpace = await this.validation.validateCreatedSpace(newSpace);
    return await this.spacesModel.createSpace(userID, newSpace);
  }
}
