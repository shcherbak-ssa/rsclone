import { promises as fsPromises } from 'fs';

import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import { emailValidation, nameValidation, passwordValidation } from '../validation';
import { ResponseSender } from './response.model';
import { USER_DB_FILENAME } from '../constants';

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

  getDataForSave() {
    return {
      name: this.name,
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
      await this.responseSender.sendSuccessResponse('Test success', { ...this.req.body });
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
    const dbResult: string = await fsPromises.readFile(USER_DB_FILENAME, {encoding: 'utf-8'});
    const usersDB: Array<User> = JSON.parse(dbResult);

    const searchUserEmail: string = user.getEmailForCheck();
    const userExist: User | undefined = usersDB.find((user) => user.email === searchUserEmail);

    if (userExist) {
      throw new RegistrationError(
        'User with current e-mail is already exist',
        {
          inputLabel: EMAIL_INPUT_LABEL,
        }
      );
    }
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
