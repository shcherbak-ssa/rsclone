import { ControllerData } from '../types/controller.types';
import { BaseController } from './base.controller';
import { UpdatedUserData, User } from '../types/user.types';
import { UserValidationImpl } from '../validation/user.validation';
import { UsersModel } from '../models/users.model';
import { UniqueModel } from '../models/unique.model';
import { EMPTY_VALUE_LENGTH, UserDataLabels } from '../constants';
import { ResponseSender } from '../types/services.types';
import { SpacesModel } from '../models/spaces.model';
import { Space } from '../../common/entities';

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
  private uniqueModel: UniqueModel;
  private spacesModel: SpacesModel;

  constructor() {
    super();

    this.validation = new UserValidationImpl();
    this.usersModel = new UsersModel();
    this.uniqueModel = new UniqueModel();
    this.spacesModel = new SpacesModel();
  }

  async runController(
    action: UsersControllerActions, {userID, body, responseSender}: ControllerData
  ): Promise<void> {
    try {
      if (!userID) throw this.unknowUserIDError();

      switch (action) {
        case UsersControllerActions.GET_USER:
          return await this.getUser(userID, responseSender);
        case UsersControllerActions.UPDATE_USER:
          return await this.updateUser(userID, body, responseSender);
        case UsersControllerActions.DELETE_USER:
          return await this.deleteUser(userID, responseSender);
      }
    } catch (error) {
      responseSender.sendErrorResponse(error);
    }
  }

  private async getUser(userID: string, responseSender: ResponseSender): Promise<void> {
    const user: User = await this.usersModel.getUser(userID);
    const spaces: Space[] = await this.spacesModel.getSpaces(userID);

    responseSender.sendSuccessJsonResponse({user, spaces});
  }

  private async updateUser(
    userID: string, updatedData: UpdatedUserData, responseSender: ResponseSender
  ): Promise<any> {
    if (Object.keys(updatedData).length === EMPTY_VALUE_LENGTH) {
      return responseSender.sendSuccessJsonResponse({});
    }

    updatedData = await this.validation.validate(updatedData);
    await this.checkExistingUserWithCurrentUsername(updatedData);
    await this.checkExistingUserWithCurrentEmail(updatedData);

    updatedData = await this.usersModel.updateUser(userID, updatedData);
    responseSender.sendSuccessJsonResponse(updatedData);
  }

  private async deleteUser(userID: string, responseSender: ResponseSender): Promise<void> {
    const deleteResult: any = await this.usersModel.deleteUser(userID);
    responseSender.sendSuccessJsonResponse(deleteResult);
  }

  private async checkExistingUserWithCurrentUsername(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.USERNAME in updatedData) {
      const username = updatedData[UserDataLabels.USERNAME] as string;
      await this.uniqueModel.checkExistingUserWithCurrentUsername(username);
    }
  }

  private async checkExistingUserWithCurrentEmail(updatedData: UpdatedUserData): Promise<void> {
    if (UserDataLabels.EMAIL in updatedData) {
      const email = updatedData[UserDataLabels.EMAIL] as string;
      await this.uniqueModel.checkExistingUserWithCurrentEmail(email);
    }
  }
}
