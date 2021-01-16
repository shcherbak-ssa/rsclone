import { ControllerData } from '../types/controller.types';
import { GetUserModel } from '../models/users/get-user.model';
import { BaseController } from './base.controller';
import { DeleteUserModel } from '../models/users/delete-user.model';
import { UpdatedUserData } from '../types/user.types';
import { UserValidationImpl } from '../validation/user.validation';
import { UpdateUserModel } from 'models/users/update-user.model';

export interface UserValidation {
  validate(updatedData: UpdatedUserData): Promise<UpdatedUserData>;
}

export enum UsersControllerActions {
  GET_USER = 'get-user',
  UPDATE_USER = 'update-user',
  DELETE_USER = 'delete-user',
};

export class UsersController extends BaseController {
  private validation: UserValidation;
  private getUserModel: GetUserModel;
  private updateUserModel: UpdateUserModel;
  private deleteUserModel: DeleteUserModel;

  constructor() {
    super();

    this.validation = new UserValidationImpl();
    this.getUserModel = new GetUserModel();
    this.updateUserModel = new UpdateUserModel();
    this.deleteUserModel = new DeleteUserModel();
  }

  async runController(
    action: UsersControllerActions, controllerData: ControllerData
  ): Promise<void> {
    super.runController(action, controllerData);
  }

  protected async doAction(
    action: UsersControllerActions, userID: string, body: any
  ): Promise<any> {
    switch (action) {
      case UsersControllerActions.GET_USER:
        return await this.getUserModel.getUser(userID);
      case UsersControllerActions.UPDATE_USER:
        return await this.updateUser(userID, body);
      case UsersControllerActions.DELETE_USER:
        return await this.deleteUserModel.deleteUser(userID);
    }
  }

  private async updateUser(userID: string, body: any): Promise<void> {
    const updatedData: UpdatedUserData = await this.validation.validate(body);
    await this.updateUserModel.updateUser(userID, updatedData);
  }
}
