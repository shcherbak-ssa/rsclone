import {join} from 'path';

import { AvatarFile, Avatars } from '../models/avatars.model';
import { UserFilesService } from './user-files.service';
import { AVATAR_LABEL } from '../../common/constants';

export class AvatarsService implements Avatars {
  private usersFiles: UserFilesService;

  constructor() {
    this.usersFiles = new UserFilesService();
  }

  async create(userID: string, {type, buffer}: AvatarFile): Promise<void> {
    const userFilesDirname: string = await this.usersFiles.createUserFilesDirname(userID);
    const userAvatarFilename: string = this.createUserAvatarFilename(userFilesDirname, type);
    await this.usersFiles.writeUserFile(userAvatarFilename, buffer);
  }

  private createUserAvatarFilename(userFilesDirname: string, fileType: string): string {
    return join(userFilesDirname, `${AVATAR_LABEL}.${fileType}`);
  }
}
