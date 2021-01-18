import { ControllerData } from '../types/controller.types';
import { AvatarsModel } from '../models/avatars.model';
import { BaseController } from './base.controller';
import { StatusCodes } from '../../common/constants';

export enum AvatarsControllerActions {
  GET_AVATAR = 'get-avatar',
  CREATE_AVATAR = 'create-avatar',
  UPDATE_AVATAR = 'update-avatar',
  DELETE_AVATAR = 'delete-avatar',
};

export class AvatarsController extends BaseController {
  private avatarsModel: AvatarsModel;

  constructor() {
    super();
    this.avatarsModel = new AvatarsModel();
  }

  async runController(
    action: AvatarsControllerActions, controllerData: ControllerData
  ): Promise<void> {
    const {responseSender} = controllerData;
    const actionResult: any = await super.runController(action, controllerData);
    
    switch (action) {
      case AvatarsControllerActions.GET_AVATAR:
        responseSender.sendFile(StatusCodes.SUCCESS, actionResult);
        break;
      case AvatarsControllerActions.CREATE_AVATAR:
        responseSender.sendSuccessJsonResponse(actionResult, StatusCodes.CREATED);
        break;
      default:
        responseSender.sendSuccessJsonResponse(actionResult);
    }
  }

  protected async doAction(
    action: AvatarsControllerActions, userID: string, avatarFile: any
  ): Promise<any> {
    switch (action) {
      case AvatarsControllerActions.GET_AVATAR:
        return await this.avatarsModel.getAvatar(userID);
      case AvatarsControllerActions.CREATE_AVATAR:
        return await this.avatarsModel.createAvatar(userID, avatarFile);
      case AvatarsControllerActions.UPDATE_AVATAR:
        return await this.avatarsModel.updatedAvatar(userID, avatarFile);
    }
  }
}
