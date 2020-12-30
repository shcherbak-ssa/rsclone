import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

import { emailValidation, nameValidation, passwordValidation } from '../validation';
import { ResponseSender } from './response.model';

const REGISTRATION_ERROR: string = 'RegistrationError';

export const registrationBodySchemaValidator = checkSchema({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

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

  async parseError(error: Error) {
    if (error instanceof RegistrationError) {
      const {message, payload} = error;
      this.responseSender.sendErrorResponse(message, payload);
    } else {
      console.log(error);
    }
  }
}
