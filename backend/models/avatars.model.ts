import { AvatarsService } from '../services/avatars.service';
import { UsersModel } from './users.model';
import { UpdatedUserData } from '../types/user.types';
import { UserDataLabels } from '../constants';
import { ClientError } from '../services/errors.service';
import { StatusCodes } from '../../common/constants';
import { usersCollectionDatabase } from '../database/users-collection.database';

export type AvatarFile = {
  type: string,
  buffer: Buffer,
};

export interface Avatars {
  get(userID: string, fileType: string): Promise<string | null>;
  create(userID: string, avatarFile: AvatarFile): Promise<void>;
  update(userID: string, currentFileType: string, avatarFile: AvatarFile): Promise<void>;
  delete(userID: string, fileType: string): Promise<void>;
}

export interface AvatarsDatabase {
  getAvatarFileType(userID: string): Promise<string>;
}

export class AvatarsModel {
  private avatars: Avatars;
  private database: AvatarsDatabase;
  private usersModel: UsersModel;

  constructor() {
    this.avatars = new AvatarsService();
    this.database = usersCollectionDatabase;
    this.usersModel = new UsersModel();
  }

  async getAvatar(userID: string): Promise<string> {
    const userAvatarFileType: string = await this.database.getAvatarFileType(userID);
    const userAvatarFilename: string | null = await this.avatars.get(userID, userAvatarFileType);

    if (userAvatarFilename === null) {
      throw new ClientError(
        'Avatar not found',
        StatusCodes.NOT_FOUND,
      );
    }

    return userAvatarFilename;
  }

  async createAvatar(userID: string, avatarFile: AvatarFile): Promise<any> {
    await this.avatars.create(userID, avatarFile);
    await this.updateUserOnDatabase(userID, avatarFile.type);

    return {};
  }

  async updatedAvatar(userID: string, avatarFile: AvatarFile): Promise<any> {
    const currentFileType: string = await this.database.getAvatarFileType(userID);

    await this.avatars.update(userID, currentFileType, avatarFile);
    await this.updateUserOnDatabase(userID, avatarFile.type);

    return {};
  }

  async deleteAvatar(userID: string): Promise<any> {
    const currentFileType: string = await this.database.getAvatarFileType(userID);

    await this.avatars.delete(userID, currentFileType);
    await this.updateUserOnDatabase(userID, '');

    return {};
  }

  private async updateUserOnDatabase(userID: string, fileType: string): Promise<void> {
    const updatedAvatar: UpdatedUserData = {
      [UserDataLabels.AVATAR]: fileType,
    };

    await this.usersModel.updateUser(userID, updatedAvatar);
  }
}
