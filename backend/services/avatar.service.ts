import { join } from 'path';
import multer from 'multer';

import { DB_DIRNAME } from '../constants';
import { Request } from 'express';

const AVATAR_LABEL: string = 'avatar';

const AVATARS_FOLDER_DESTINATION: string = join(DB_DIRNAME, 'avatars');

export class AvatarService {
  createMiddleware() {
    return multer({ storage: this.createStorageConfig() }).single(AVATAR_LABEL);
  }

  private createStorageConfig() {
    return multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, AVATARS_FOLDER_DESTINATION);
      },
      filename: (req: Request, file: Express.Multer.File, cb) => {
        if (req.user) {
          const userAvatarFilename = this.createUserAvatarFilename(req.user.id, file.mimetype);
          req.userAvatarFilename = userAvatarFilename;

          cb(null, userAvatarFilename);
        }
      }
    });
  }

  createUserAvatarFilename(userID: number, mimetype: string) {
    return `${userID}-avatar.${this.getFileTypeFromMimeType(mimetype)}`;
  }

  private getFileTypeFromMimeType(mimetype: string) {
    return mimetype.split('/')[1];
  }
}
