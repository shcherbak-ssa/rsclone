import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import { emailValidation, nameValidation, passwordValidation } from '../validation';
import { ResponseSender } from './response.model';
import { DB_DIRNAME, Language, Theme, USER_DB_FILENAME } from '../constants';
import { UsernameService } from '../services/username.service';

const REGISTRATION_ERROR: string = 'RegistrationError';
const EMAIL_INPUT_LABEL: string = 'email';

export const loginBodySchemaValidator = checkSchema({
  email: emailValidation,
  password: passwordValidation,
});

export const registrationBodySchemaValidator = checkSchema({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

interface IUser {
  name?: string;
  email: string;
  password: string;
}

type UsersDB = {
  email: string;
  password: string;
};

type UserDB = {
  id: number;
  name: string;
  avatar: string;
  username: string;
  theme: string;
  language: string;
};

class User implements IUser {
  name: string;
  email: string;
  password: string;

  constructor({name = '', email, password}: IUser) {
    this.name = name;
    this.email = email.toLowerCase();
    this.password = password;
  }

  getEmailForCheck() {
    return this.email;
  }

  getDataToCreateUserDB(newUserID: number): UserDB {
    const usernameService: UsernameService = new UsernameService();
    const username: string = usernameService.createUsername(this.email);

    return {
      id: newUserID,
      name: this.name,
      avatar: '',
      username,
      theme: Theme.ORIGINAL,
      language: Language.ENGLISH,
    }
  }

  getDataForUsersDB(): UsersDB {
    return {
      email: this.email,
      password: this.password,
    }
  }
}

class AuthError implements Error {
  name: string = REGISTRATION_ERROR;
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}

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
      throw new AuthError(message, {inputLabel});
    }
  }

  async sendResponse(userID: number) {
    await this.responseSender.sendSuccessResponse('Success', { id: userID });
  }

  async readUsersDB(): Promise<Array<UsersDB>> {
    const dbResult: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(dbResult);
  }

  async parseError(error: Error) {
    if (error instanceof AuthError) {
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

    const user: User = new User(this.req.body);
    await this.checkUserExisting(user);

    const newUserID: number = await this.createNewUser(user);
    await this.sendResponse(newUserID);
  }

  async checkUserExisting(user: User) {
    const usersDB: Array<UsersDB> = await this.readUsersDB();
    const searchUserEmail: string = user.getEmailForCheck();
    const userExist: UsersDB | undefined = usersDB.find((user) => user.email === searchUserEmail);

    if (userExist) {
      throw new AuthError(
        'User with current e-mail is already exist',
        {
          inputLabel: EMAIL_INPUT_LABEL,
        }
      );
    }
  }

  async createNewUser(user: User) {
    const usersDB: Array<UsersDB> = await this.readUsersDB();
    const newUser: UsersDB = user.getDataForUsersDB();

    usersDB.push(newUser);
    const newUserID: number = usersDB.length - 1;

    this.updateUsersDB(usersDB);
    this.createNewUserDB(newUserID, user);

    return newUserID;
  }

  async updateUsersDB(usersDB: Array<UsersDB>) {
    fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(usersDB, null, 2));
  }

  async createNewUserDB(newUserID: number, user: User) {
    const newUser: UserDB = user.getDataToCreateUserDB(newUserID);
    const newUserDBFilename: string = join(DB_DIRNAME, `user-${newUser.id}.json`);

    await fsPromises.writeFile(newUserDBFilename, JSON.stringify({user: newUser}, null, 2));
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

    const user: User = new User(this.req.body);
    const newUserID: number = await this.findUser(user);
    await this.sendResponse(newUserID);
  }

  async findUser(user: User) {
    const usersDB: Array<UsersDB> = await this.readUsersDB();
    const {email, password} = user.getDataForUsersDB();

    const userID: number = usersDB.findIndex((userItem) => {
      return userItem.email === email && userItem.password === password;
    });

    if (userID < 0) {
      throw new AuthError('Invalid e-mail or password', {});
    }

    return userID; 
  }
}
