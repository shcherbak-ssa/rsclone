import { ControllerData } from '../types/controller.types';
import { BaseController } from './base.controller';
import { UpdatedUserData } from '../types/user.types';
import { UserValidationImpl } from '../validation/user.validation';
import { UsersModel } from '../models/users.model';

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
  private usersModel: UsersModel;

  constructor() {
    super();

    this.validation = new UserValidationImpl();
    this.usersModel = new UsersModel();
  }

  async runController(
    action: UsersControllerActions, controllerData: ControllerData
  ): Promise<void> {
    const actionResult: any = await super.runController(action, controllerData);
    controllerData.responseSender.sendSuccessJsonResponse(actionResult);
  }

  protected async doAction(
    action: UsersControllerActions, userID: string, body: any
  ): Promise<any> {
    switch (action) {
      case UsersControllerActions.GET_USER:
        return await this.usersModel.getUser(userID);
      case UsersControllerActions.UPDATE_USER:
        return await this.updateUser(userID, body);
      case UsersControllerActions.DELETE_USER:
        return await this.usersModel.deleteUser(userID);
    }
  }

  private async updateUser(userID: string, body: any): Promise<any> {
    const updatedData: UpdatedUserData = await this.validation.validate(body);
    return await this.usersModel.updateUser(userID, updatedData);
  }
}
