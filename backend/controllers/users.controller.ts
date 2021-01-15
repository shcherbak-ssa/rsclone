import { GetUser } from '../types/user.types';
import { ControllerData } from '../types/controller.types';
import { GetUserModel } from '../models/users/get-user.model';
import { BaseController } from './base.controller';

export class UsersController extends BaseController {
  private getUserModel: GetUserModel;

  constructor() {
    super();
    this.getUserModel = new GetUserModel();
  }

  async getUser({userID, responseSender}: ControllerData): Promise<void> {
    try {
      if (!userID) throw this.unknowUserIDError();

      const user: GetUser = await this.getUserModel.getUser(userID);
      await responseSender.sendSuccessJsonResponse(user);
    } catch (error) {
      await responseSender.sendErrorResponse(error);
    }
  }
}
