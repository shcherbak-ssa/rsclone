import { ErrorNames } from '../../common/constants';
import { ValidationError } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { ClientError } from '../services/errors.service';
import { Request, Response } from '../types/services.types';
import { UpdatedData } from '../types/user.types';
import { UserValidation } from '../validation/user.validation';
import { BaseModel } from './base.model';
import { UserInputsModel } from './user-inputs.model';
import { UserModel } from './user.model';

export interface UpdateUserValidation {
  validate(updatedData: UpdatedData): Promise<UpdatedData>;
}

export class UpdateUserModel extends BaseModel {
  private validation: UpdateUserValidation;
  private userInputsModel: UserInputsModel;
  private userModel: UserModel;

  constructor() {
    super();

    this.validation = new UserValidation();
    this.userInputsModel = new UserInputsModel();
    this.userModel = new UserModel();
  }

  async updateUser(updatedData: UpdatedData): Promise<void> {
    try {
      updatedData = await this.validation.validate(updatedData);

      const request: Request = this.createRequest(updatedData);
      const response: Response = await this.requestSender.send(request).update();
      
      response.parseResponse();
      this.userModel.updateState(Object.keys(updatedData) as UserDataLabels[]);
    } catch (error) {
      this.parseError(error);
    }
  }

  private createRequest(body: any): Request {
    const usersPathname: string = this.getUsersPathname();

    return this.requestCreator
      .appendUrlPathname(usersPathname)
      .setBody(body)
      .createRequest();
  }

  private parseError(error: Error) {
    let payload: any;

    switch (error.name) {
      case ErrorNames.VALIDATION_ERROR:
        payload = (error as ValidationError).payload;
        break;
      case ErrorNames.CLIENT_ERROR:
        payload = (error as ClientError).getPayload();
        break;
      default:
        console.log(error);
        return;
    }

    this.userInputsModel.setInputError(payload.errorLabel, payload.dataLabel);
  }
}
