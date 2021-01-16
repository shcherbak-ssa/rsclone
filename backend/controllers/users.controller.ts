import { ControllerData } from '../types/controller.types';
import { GetUserModel } from '../models/users/get-user.model';
import { BaseController } from './base.controller';
import { DeleteUserModel } from '../models/users/delete-user.model';

export enum UsersControllerActions {
  GET_USER = 'get-user',
  DELETE_USER = 'delete-user',
};

export class UsersController extends BaseController {
  private getUserModel: GetUserModel;
  private deleteUserModel: DeleteUserModel;

  constructor() {
    super();

    this.getUserModel = new GetUserModel();
    this.deleteUserModel = new DeleteUserModel();
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
      case UsersControllerActions.DELETE_USER:
        return await this.deleteUserModel.deleteUser(userID);
    }
  }
}
