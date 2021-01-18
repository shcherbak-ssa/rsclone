import { ControllerData } from '../types/controller.types';
import { AvatarsModel } from '../models/avatars.model';
import { BaseController } from './base.controller';

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
    super.runController(action, controllerData);
  }

  protected async doAction(
    action: AvatarsControllerActions, userID: string, avatarFile: any
  ): Promise<any> {
    switch (action) {
      case AvatarsControllerActions.CREATE_AVATAR:
        return await this.avatarsModel.createAvatar(userID, avatarFile);
    }
  }
}
