import { ControllerData } from '../types/controller.types';
import { AvatarFile, AvatarsModel } from '../models/avatars.model';
import { BaseController } from './base.controller';
import { StatusCodes } from '../../common/constants';
import { ResponseSender } from '../types/services.types';
import { UsersModel } from '../models/users.model';
import { UpdatedUserData } from '../types/user.types';
import { UserDataLabels } from '../constants';

export enum AvatarsControllerActions {
  GET_AVATAR = 'get-avatar',
  CREATE_AVATAR = 'create-avatar',
  UPDATE_AVATAR = 'update-avatar',
  DELETE_AVATAR = 'delete-avatar',
};

export class AvatarsController extends BaseController {
  private avatarsModel: AvatarsModel;
  private usersModel: UsersModel;

  constructor() {
    super();

    this.avatarsModel = new AvatarsModel();
    this.usersModel = new UsersModel();
  }

  async runController(
    action: AvatarsControllerActions, {userID, body, responseSender}: ControllerData
  ): Promise<void> {
    try {
      if (!userID) throw this.unknowUserIDError();

      switch (action) {
        case AvatarsControllerActions.GET_AVATAR:
          return await this.getAvatar(userID, responseSender);
        case AvatarsControllerActions.CREATE_AVATAR:
          return await this.createAvatar(userID, body, responseSender);
        case AvatarsControllerActions.UPDATE_AVATAR:
          return await this.updateAvatar(userID, body, responseSender);
        case AvatarsControllerActions.DELETE_AVATAR:
          return await this.deleteAvatar(userID, responseSender);
      }
    } catch (error) {
      responseSender.sendErrorResponse(error);
    }
  }

  private async getAvatar(userID: string, responseSender: ResponseSender): Promise<void> {
    const userAvatarFilename: string = await this.avatarsModel.getAvatar(userID);
    responseSender.sendFile(StatusCodes.SUCCESS, userAvatarFilename);
  }

  private async createAvatar(
    userID: string, avatarFile: AvatarFile, responseSender: ResponseSender
  ): Promise<void> {
    const avatarFileType: string = await this.avatarsModel.createAvatar(userID, avatarFile);
    await this.updateUserAvatar(userID, avatarFileType);

    responseSender.sendSuccessJsonResponse({}, StatusCodes.CREATED);
  }

  private async updateAvatar(
    userID: string, avatarFile: AvatarFile, responseSender: ResponseSender
  ): Promise<void> {
    const newAvatarFileType: string = await this.avatarsModel.updatedAvatar(userID, avatarFile);
    await this.updateUserAvatar(userID, newAvatarFileType);

    responseSender.sendSuccessJsonResponse({});
  }

  private async deleteAvatar(userID: string, responseSender: ResponseSender): Promise<void> {
    await this.avatarsModel.deleteAvatar(userID);
    await this.updateUserAvatar(userID, '');

    responseSender.sendSuccessJsonResponse({});
  }

  private async updateUserAvatar(userID: string, fileType: string): Promise<void> {
    const updatedAvatar: UpdatedUserData = {
      [UserDataLabels.AVATAR]: fileType,
    };

    await this.usersModel.updateUser(userID, updatedAvatar);
  }
}
