import { AvatarsService } from '../services/avatars.service';
import { UsersModel } from './users.model';
import { AVATAR_EXIST_LABEL } from '../../common/constants';
import { UpdatedUserData } from '../types/user.types';
import { UserDataLabels } from '../constants';

export type AvatarFile = {
  type: string,
  buffer: Buffer,
};

export interface Avatars {
  create(userID: string, avatarFile: AvatarFile): Promise<void>;
}

export class AvatarsModel {
  private avatars: Avatars;
  private usersModel: UsersModel;

  constructor() {
    this.avatars = new AvatarsService();
    this.usersModel = new UsersModel();
  }

  async createAvatar(userID: string, avatarFile: AvatarFile): Promise<any> {
    await this.avatars.create(userID, avatarFile);

    const updatedAvatar: UpdatedUserData = {
      [UserDataLabels.AVATAR]: AVATAR_EXIST_LABEL,
    };

    await this.usersModel.updateUser(userID, updatedAvatar);

    return {};
  }
}
