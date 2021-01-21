import { AvatarsService } from '../services/avatars.service';
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

  constructor() {
    this.avatars = new AvatarsService();
    this.database = usersCollectionDatabase;
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

  async createAvatar(userID: string, avatarFile: AvatarFile): Promise<string> {
    await this.avatars.create(userID, avatarFile);
    return avatarFile.type;
  }

  async updatedAvatar(userID: string, avatarFile: AvatarFile): Promise<string> {
    const currentFileType: string = await this.database.getAvatarFileType(userID);
    await this.avatars.update(userID, currentFileType, avatarFile);

    return avatarFile.type;
  }

  async deleteAvatar(userID: string): Promise<void> {
    const currentFileType: string = await this.database.getAvatarFileType(userID);
    await this.avatars.delete(userID, currentFileType);
  }
}
