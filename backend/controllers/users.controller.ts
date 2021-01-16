import { ControllerData } from '../types/controller.types';
import { GetUserModel } from '../models/users/get-user.model';
import { BaseController } from './base.controller';

export enum UsersControllerActions {
  GET_USER = 'get-user',
};

export class UsersController extends BaseController {
  private getUserModel: GetUserModel;

  constructor() {
    super();
    this.getUserModel = new GetUserModel();
  }

  async runController(
    action: UsersControllerActions, controllerData: ControllerData
  ): Promise<void> {
    super.runController(action, controllerData);
  }

  protected async doAction(action: UsersControllerActions, userID: string): Promise<any> {
    switch (action) {
      case UsersControllerActions.GET_USER:
        return await this.getUserModel.getUser(userID);
    }
  }
}
