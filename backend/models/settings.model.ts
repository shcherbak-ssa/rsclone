import { join } from 'path';
import { existsSync, promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';
import { Schema, validationResult } from 'express-validator';

import { UserType } from '../../core/types';
import { AVATARS_DB_DIRNAME, DB_DIRNAME, USER_DB_FILENAME } from '../constants';
import { ResponseSender } from './response.model';
import {
  usernameValidation,
  passwordValidation,
  emailValidation,
  nameValidation,
  ValidationError,
} from '../validation';

const USERNAME_LABEL: string = 'username';
const EMAIL_LABEL: string = 'email';
const PASSWORD_LABEL: string = 'password';

export const settingsValidationSchema: Schema = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  username: usernameValidation,
};

export class SettingsModel {
  req: Request;
  responseSender: ResponseSender;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.responseSender = new ResponseSender(res);
  }

  static async updateUserData(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next();

    await new SettingsModel(req, res).updateUserData();
  }

  static async confirmPassword(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next();

    await new SettingsModel(req, res).confirmPassword();
  }

  static async loadUserAvatar(req: Request, res: Response, next: NextFunction) {
    if (!req.user || !req.file) return next();

    await new SettingsModel(req, res).loadUserAvatar();
  }

  async updateUserData() {
    try {
      await this.validateBody();

      const requestBody = await this.getRequestBody();
      const user: UserType | undefined = this.req.user;

      if (user) {
        const updatedUser = await this.update(user, requestBody);
        await this.saveUpdatedUserToDB(updatedUser);

        if (PASSWORD_LABEL in requestBody) {
          delete requestBody.password;
        }

        await this.responseSender.sendSuccessResponse('success', {...requestBody});
      }
    } catch (error) {
      await this.parseError(error);
    }
  }

  async confirmPassword() {
    try {
      await this.validateBody();

      const requestBody = await this.getRequestBody();
      const user: UserType | undefined = this.req.user;

      if (user) {
        await this.checkPassword(user, requestBody.password);
        await this.responseSender.sendSuccessResponse('success', {});
      }
    } catch (error) {
      await this.parseError(error);
    }
  }

  async loadUserAvatar() {
    const {userAvatarFilename} = this.req;
    const user: UserType | undefined = this.req.user;

    if (user) {
      if (user.avatar) {
        await this.deleteCurrentUserAvatar(user.avatar);
      }

      const updatedUser = await this.update(user, { avatar: userAvatarFilename });
      await this.saveUpdatedUserToDB(updatedUser);
  
      this.responseSender.sendSuccessResponse('success', { avatar: userAvatarFilename });
    }
  }

  async deleteCurrentUserAvatar(userAvatar: string) {
    const userAvatarFilename = join(AVATARS_DB_DIRNAME, userAvatar);
    await fsPromises.unlink(userAvatarFilename);
  }

  async checkPassword(user: UserType, password: string) {
    if (user.password !== password) {
      throw new ValidationError('Invalid password', {});
    }
  }

  async validateBody() {
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      const {msg: message, param: inputLabel} = errors.array()[0];
      throw new ValidationError(message, {inputLabel});
    }
  }

  async getRequestBody() {
    return this.req.body;
  }

  async update(user: UserType, requestBody: any) {
    if (EMAIL_LABEL in requestBody) {
      const {email} = requestBody;
      await this.checkNewEmailExisting(email);
    }
    
    if (USERNAME_LABEL in requestBody) {
      const {username} = requestBody;

      await this.checkNewUsernameExisting(username);
      await this.renameUserDB(user.username, username);
    }

    return {...user, ...requestBody};
  }

  async checkNewEmailExisting(email: string) {
    const usersDB = await this.readUsersDB();
    const emailExist = usersDB.findIndex((user) => user.email === email);

    if (emailExist >= 0) {
      throw new ValidationError(
        'User with current email is already exist',
        { inputLabel: EMAIL_LABEL },
      );
    }
  }

  async checkNewUsernameExisting(newUsername: string) {
    const newUsernameFilename = join(DB_DIRNAME, `@${newUsername}.json`);

    if (existsSync(newUsernameFilename)) {
      throw new ValidationError(
        'User with current username is already exist',
        { inputLabel: USERNAME_LABEL },
      );
    }
  }

  async renameUserDB(currentUsername: string, newUsername: string) {
    const currentUsernameFilename = join(DB_DIRNAME, `@${currentUsername}.json`);
    const newUsernameFilename = join(DB_DIRNAME, `@${newUsername}.json`);
    await fsPromises.rename(currentUsernameFilename, newUsernameFilename);
  }

  async saveUpdatedUserToDB(updatedUser: UserType) {
    const usersDB = await this.readUsersDB();
    usersDB.forEach((user, index, array) => {
      if (user.id === updatedUser.id) {
        array[index] = updatedUser;
      }
    });

    await fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(usersDB, null, 2));
  }

  async readUsersDB(): Promise<Array<UserType>> {
    const result: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(result);
  }

  async parseError(error: Error) {
    if (error instanceof ValidationError) {
      const {message, payload} = error;
      await this.responseSender.sendErrorResponse(message, payload);
    } else {
      console.log(error);
    }
  }
}
