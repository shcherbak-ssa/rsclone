import { UserDataLabels } from '../constants';
import { UserLocalStorageService } from '../services/user-local-storage.service';
import { Request, Response, UserLocalStorage } from '../types/services.types';
import { UpdatedData } from '../types/user.types';
import { UserValidation } from '../validation/user.validation';
import { BaseDraftModel } from './base.model';
import { UserModel } from './user.model';

export interface UserUpdateValidation {
  validate(updatedData: UpdatedData): Promise<UpdatedData>;
}

export class UserUpdateModel extends BaseDraftModel {
  private validation: UserUpdateValidation;
  private userModel: UserModel;

  constructor() {
    super();

    this.validation = new UserValidation();
    this.userModel = new UserModel();
  }

  async updateUser(updatedData: UpdatedData): Promise<boolean> {
    try {
      updatedData = await this.validation.validate(updatedData);

      const request: Request = this.createRequest(updatedData);
      const response: Response = await this.requestSender.send(request).update();
      
      const serverUpdatedData: UpdatedData = response.parseResponse();
      this.userModel.updateStates(serverUpdatedData);

      this.resetPasswords(updatedData);
      this.updateUsername(updatedData);
      
      return true;
    } catch (error) {
      this.parseError(error);
      return false;
    }
  }

  private createRequest(body: any): Request {
    const usersPathname: string = this.urlPathname.getUsersPathname();

    return this.requestCreator
      .appendUrlPathname(usersPathname)
      .setBody(body)
      .createRequest();
  }

  private resetPasswords(updatedData: UpdatedData) {
    if (UserDataLabels.PASSWORD in updatedData) {
      const resetedPasswords: UpdatedData = {
        [UserDataLabels.PASSWORD]: '',
        [UserDataLabels.NEW_PASSWORD]: '',
      };

      this.userModel.updateStates(resetedPasswords);
      this.userModel.syncDraft();
    }
  }

  private updateUsername(updatedData: UpdatedData) {
    if (UserDataLabels.USERNAME in updatedData) {      
      const userLocalStorage: UserLocalStorage = new UserLocalStorageService();
      const token: string = userLocalStorage.getToken();
      const username = updatedData[UserDataLabels.USERNAME] as string;
      userLocalStorage.saveUser({token, username});
    }
  }
}
