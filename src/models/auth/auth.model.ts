import { Stores, UserDataLabels } from '../../constants';
import { StoreManager } from '../../types/store.types';
import { UserLocalStorageType } from '../../types/user.types';
import { StoreManagerService } from '../../services/store-manager.service';
import { InputState, UserDraftStoreState } from '../../types/user-draft.types';
import { AuthStore } from '../../types/auth.types';
import { UserDraftModel } from '../user-draft.model';
import { ErrorNames, RequestPathnames } from '../../../common/constants';
import { ValidationError } from '../../../common/validation';
import { Request, Response, UserLocalStorage } from '../../types/services.types';
import { ClientError } from '../../services/errors.service';
import { UserLocalStorageService } from '../../services/user-local-storage.service';
import { BaseModel } from '../base.model';

export type AuthModeParameters = {
  inputDataLabels: UserDataLabels[],
  urlPathname: RequestPathnames,
  validateFunction: (inputValues: UserDraftStoreState) => Promise<UserDraftStoreState>,
}

export class AuthModel extends BaseModel {
  private storeManager: StoreManager;
  private authStore: AuthStore;
  private userDraftModel: UserDraftModel;

  constructor() {
    super();

    this.storeManager = new StoreManagerService();
    this.authStore = this.storeManager.getStore(Stores.AUTH_STORE) as AuthStore;
    this.userDraftModel = new UserDraftModel();

    this.removeError();
  }

  async runAuthMode({
    inputDataLabels, urlPathname, validateFunction
  }: AuthModeParameters) {
    try {
      const inputValues: UserDraftStoreState = this.getInputValues(inputDataLabels);
      const user: UserDraftStoreState = await validateFunction(inputValues);
      const userStorage: UserLocalStorageType = await this.sendRequest(urlPathname, user);

      this.saveUserToLocalStorage(userStorage);
      this.reloadApp();
    } catch (error) {
      this.parseError(error);
    }
  }

  removeError() {
    this.authStore.setAuthError('');
  }

  private getInputValues(dataLabels: UserDataLabels[]): UserDraftStoreState {
    const inputValues = {};

    dataLabels.forEach((dataLabel) => {
      const input = this.userDraftModel.getDraftState(dataLabel) as InputState;
      inputValues[dataLabel] = input.value;
    });

    return inputValues;
  }

  private async sendRequest(urlPathname: RequestPathnames, user: any): Promise<UserLocalStorageType> {
    const request: Request = this.createRequest(urlPathname, user);
    const response: Response = await this.requestSender.send(request).create();
    return response.parseResponse();
  }

  private saveUserToLocalStorage(user: UserLocalStorageType) {
    const userLocalStorage: UserLocalStorage = new UserLocalStorageService();
    userLocalStorage.saveUser(user);
  }

  private reloadApp() {
    location.replace(location.origin);
  }

  private parseError(error: Error): void {
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

    if (payload.isLoginError) {
      this.authStore.setAuthError(payload.error);
    } else {
      this.userDraftModel.setError(payload.errorLabel, payload.dataLabel);
    }
  }

  private createRequest(urlPathname: RequestPathnames, body: any): Request {
    return this.requestCreator
      .appendUrlPathname(urlPathname)
      .setBody(body)
      .createRequest();
  }
}
