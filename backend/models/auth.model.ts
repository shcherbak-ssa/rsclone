import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import {
  emailValidation,
  nameValidation,
  passwordValidation,
  ValidationError,
} from '../validation';
import { ResponseSender } from './response.model';
import { DB_DIRNAME, USER_DB_FILENAME } from '../constants';
import { UserType } from '../../core/types';
import { AuthUser } from './auth-user.model';

const EMAIL_INPUT_LABEL: string = 'email';

const emailValidationSchema = {
  ...emailValidation,
  exists: {
    options: { checkFalsy: true },
    errorMessage: 'E-mail cannot be empty',
  },
};

const passwordValidationSchema = {
  ...passwordValidation,
  exists: {
    options: { checkFalsy: true },
    errorMessage: 'Password cannot be empty',
  },
};

export const loginBodySchemaValidator = checkSchema({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

export const registrationBodySchemaValidator = checkSchema({
  name: {
    ...nameValidation,
    exists: {
      options: { checkFalsy: true },
      errorMessage: 'Name cannot be empty',
    },
  },
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

class AuthModel {
  req: Request;
  responseSender: ResponseSender;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.responseSender = new ResponseSender(res);
  }

  async run() {
    try {
      await this.tryToRun();
    } catch (error) {
      await this.parseError(error);
    }
  }

  async tryToRun() {
    await this.validateBody();
  }

  async validateBody() {
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      const {msg: message, param: inputLabel} = errors.array()[0];
      throw new ValidationError(message, {inputLabel});
    }
  }

  async sendResponse(userID: number, username: string) {
    await this.responseSender.sendSuccessResponse('Success', { userID, username });
  }

  async readUsersDB(): Promise<Array<UserType>> {
    const dbResult: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(dbResult);
  }

  async parseError(error: Error) {
    if (error instanceof ValidationError) {
      const {message, payload} = error;
      this.responseSender.sendErrorResponse(message, payload);
    } else {
      console.log(error);
    }
  }
}

export class RegistrationModel extends AuthModel {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  static startRegistration(req: Request, res: Response) {
    new RegistrationModel(req, res).run();
  }

  async tryToRun() {
    await super.tryToRun();

    const user: AuthUser = new AuthUser(this.req.body);
    await this.checkUserExisting(user);

    const {newUserID, username} = await this.createNewUser(user);
    await this.sendResponse(newUserID, username);
  }

  async checkUserExisting(user: AuthUser) {
    const usersDB: Array<UserType> = await this.readUsersDB();
    const searchUserEmail: string = user.getEmailForCheck();
    const userExist: UserType | undefined = usersDB.find((user) => user.email === searchUserEmail);

    if (userExist) {
      throw new ValidationError(
        'User with current e-mail is already exist',
        {
          inputLabel: EMAIL_INPUT_LABEL,
        }
      );
    }
  }

  async createNewUser(user: AuthUser) {
    const usersDB: Array<UserType> = await this.readUsersDB();
    
    const newUserID: number = usersDB.length;
    const newUser: UserType = user.getDataForUsersDB(newUserID);
    
    usersDB.push(newUser);
    await this.updateUsersDB(usersDB);

    const {username} = newUser;
    await this.createNewUserDB(user, username);

    return { newUserID, username };
  }

  async updateUsersDB(usersDB: Array<UserType>) {
    fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(usersDB, null, 2));
  }

  async createNewUserDB(user: AuthUser, username: string) {
    const newUser = user.getDataToCreateUserDB();
    const newUserDBFilename: string = join(DB_DIRNAME, `@${username}.json`);

    await fsPromises.writeFile(newUserDBFilename, JSON.stringify(newUser, null, 2));
  }
}

export class LoginModel extends AuthModel {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  static startLogin(req: Request, res: Response) {
    new LoginModel(req, res).run();
  }

  async tryToRun() {
    await super.tryToRun();

    const user: AuthUser = new AuthUser(this.req.body);
    const {userID, username} = await this.findUser(user);
    await this.sendResponse(userID, username);
  }

  async findUser(user: AuthUser) {
    const usersDB: Array<UserType> = await this.readUsersDB();
    const {email, password} = user;

    const userID: number = usersDB.findIndex((userItem) => {
      return userItem.email === email && userItem.password === password;
    });

    if (userID < 0) {
      throw new ValidationError('Invalid e-mail or password', {});
    }

    const {username} = usersDB[userID];
    return { userID, username }; 
  }
}
