import {join} from 'path';

import { AvatarFile, Avatars } from '../models/avatars.model';
import { UserFilesService } from './user-files.service';
import { AVATAR_LABEL } from '../../common/constants';

export class AvatarsService implements Avatars {
  private usersFiles: UserFilesService;

  constructor() {
    this.usersFiles = new UserFilesService();
  }

  async get(userID: string, fileType: string): Promise<string | null> {
    const userAvatarFilename: string = await this.createUserAvatarFilename(userID, fileType);
    return this.usersFiles.fileIsExist(userAvatarFilename) ? userAvatarFilename : null;
  }

  async create(userID: string, {type, buffer}: AvatarFile): Promise<void> {
    const userAvatarFilename: string = await this.createUserAvatarFilename(userID, type);
    await this.usersFiles.writeUserFile(userAvatarFilename, buffer);
  }

  async update(userID: string, currentFileType: string, avatarFile: AvatarFile): Promise<void> {
    await this.delete(userID, currentFileType);
    await this.create(userID, avatarFile);
  }

  async delete(userID: string, fileType: string): Promise<void> {
    const userAvatarFilename: string = await this.createUserAvatarFilename(userID, fileType);
    await this.usersFiles.removeUserFile(userAvatarFilename);
  }

  private async createUserAvatarFilename(userID: string, fileType: string): Promise<string> {
    const userFilesDirname: string = await this.usersFiles.createUserFilesDirname(userID);
    return join(userFilesDirname, `${AVATAR_LABEL}.${fileType}`);
  }
}
