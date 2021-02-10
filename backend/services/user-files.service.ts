import {join} from 'path';
import { existsSync, promises as fsPromises } from 'fs';

import { USERS_FILES_DB_DIRNAME } from '../constants';
import { UserFiles } from '../types/services.types';

export class UserFilesService implements UserFiles {
  static usersFilesDBDirname: string = join(process.cwd(), USERS_FILES_DB_DIRNAME);
  
  static async init(): Promise<void> {
    if (!existsSync(UserFilesService.usersFilesDBDirname)) {
      await fsPromises.mkdir(UserFilesService.usersFilesDBDirname);
    }
  }

  static getFileType(mimetype: string) {
    return mimetype.split('/')[1];
  }

  fileIsExist(filename: string): boolean {
    return existsSync(filename);
  }

  async createUserFilesDirname(userID: string): Promise<string> {
    const userFilesDirname: string = join(UserFilesService.usersFilesDBDirname, userID);
    await this.createUserFilesFolderIfDoesNotExist(userFilesDirname);

    return userFilesDirname;
  }

  async writeUserFile(userFileFilename: string, fileBuffer: Buffer): Promise<void> {
    await fsPromises.writeFile(userFileFilename, fileBuffer);
  }

  async removeUserFile(userFileFilename: string): Promise<void> {
    if (this.fileIsExist(userFileFilename)) {
      await fsPromises.unlink(userFileFilename);
    }
  }

  private async createUserFilesFolderIfDoesNotExist(userFilesDirname: string): Promise<void> {
    if (!existsSync(userFilesDirname)) {
      await fsPromises.mkdir(userFilesDirname);
    }
  }

  // implements UserFiles
  async deleteUserFilesFolder(userID: string): Promise<void> {
    const userFilesDirname: string = await this.createUserFilesDirname(userID);
    await fsPromises.rmdir(userFilesDirname, {recursive: true});
  }
}
