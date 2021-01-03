import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import { emailValidation, nameValidation, passwordValidation } from '../validation';
import { ResponseSender } from './response.model';
import { DB_DIRNAME, USER_DB_FILENAME } from '../constants';
import { UsernameService } from '../services/username.service';

const REGISTRATION_ERROR: string = 'RegistrationError';
const EMAIL_INPUT_LABEL: string = 'email';

export const registrationBodySchemaValidator = checkSchema({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

interface User {
  name: string;
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
};

class NewUser implements User {
  name: string;
  email: string;
  password: string;

  constructor({name, email, password}: User) {
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
    }
  }

  getDataForSaveToUsersDB(): UsersDB {
    return {
      email: this.email,
      password: this.password,
    }
  }
}

class RegistrationError implements Error {
  name: string = REGISTRATION_ERROR;
  message: string;
  payload: any;

  constructor(message: string, payload: any) {
    this.message = message;
    this.payload = payload;
  }
}

export class RegistrationModel {
  req: Request;
  responseSender: ResponseSender;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.responseSender = new ResponseSender(res);
  }

  static startRegistration(req: Request, res: Response) {
    new RegistrationModel(req, res).run();
  }

  async run() {
    try {
      await this.validateBody();

      const user: NewUser = new NewUser(this.req.body);
      await this.checkUserExisting(user);

      const newUserID: number = await this.createNewUser(user);
      await this.sendResponse(newUserID);
    } catch (error) {
      await this.parseError(error);
    }
  }

  async validateBody() {
    const errors = validationResult(this.req);

    if (!errors.isEmpty()) {
      const {msg: message, param: inputLabel} = errors.array()[0];
      throw new RegistrationError(message, {inputLabel});
    }
  }

  async checkUserExisting(user: NewUser) {
    const usersDB: Array<UsersDB> = await this.readUsersDB();
    const searchUserEmail: string = user.getEmailForCheck();
    const userExist: UsersDB | undefined = usersDB.find((user) => user.email === searchUserEmail);

    if (userExist) {
      throw new RegistrationError(
        'User with current e-mail is already exist',
        {
          inputLabel: EMAIL_INPUT_LABEL,
        }
      );
    }
  }

  async createNewUser(user: NewUser) {
    const usersDB: Array<UsersDB> = await this.readUsersDB();
    const newUser: UsersDB = user.getDataForSaveToUsersDB();

    usersDB.push(newUser);
    const newUserID: number = usersDB.length - 1;

    this.updateUsersDB(usersDB);
    this.createNewUserDB(newUserID, user);

    return newUserID;
  }
  
  async sendResponse(newUserID: number) {
    await this.responseSender.sendSuccessResponse('Success', { id: newUserID });
  }

  async readUsersDB(): Promise<Array<UsersDB>> {
    const dbResult: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    return JSON.parse(dbResult);
  }

  async updateUsersDB(usersDB: Array<UsersDB>) {
    fsPromises.writeFile(USER_DB_FILENAME, JSON.stringify(usersDB, null, 2));
  }

  async createNewUserDB(newUserID: number, user: NewUser) {
    const newUser: UserDB = user.getDataToCreateUserDB(newUserID);
    const newUserDBFilename: string = join(DB_DIRNAME, `${newUser.username}-${newUser.id}.json`);

    await fsPromises.writeFile(newUserDBFilename, JSON.stringify({user: newUser}, null, 2));
  }

  async parseError(error: Error) {
    if (error instanceof RegistrationError) {
      const {message, payload} = error;
      this.responseSender.sendErrorResponse(message, payload);
    } else {
      console.log(error);
    }
  }
}
