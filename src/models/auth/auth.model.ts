import { Stores, UserDataLabels } from '../../constants';
import { StoreManager } from '../../types/store.types';
import { UserLocalStorageType } from '../../types/user.types';
import { StoreManagerService } from '../../services/store-manager.service';
import { InputState, UserInputsStoreState } from '../../types/user-inputs.types';
import { AuthStore, AuthUserData } from '../../types/auth.types';
import { UserInputsModel } from '../user-inputs.model';
import { ErrorNames, RequestPathnames } from '../../../common/constants';
import { ValidationError } from '../../../common/validation';
import { Request, RequestCreator, RequestSender, Response } from '../../types/services.types';
import { RequestCreatorService } from '../../services/request-creator.service';
import { RequestSenderService } from '../../services/request-sender.service';
import { ClientError } from '../../services/errors.service';

export class AuthModel {
  private storeManager: StoreManager;
  private userInputsModel: UserInputsModel;
  private requestCreator: RequestCreator;
  private requestSender: RequestSender;

  constructor() {
    this.storeManager = new StoreManagerService();
    this.userInputsModel = new UserInputsModel();
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();
  }

  protected getInputValues(dataLabels: UserDataLabels[]): UserInputsStoreState {
    const inputValues = {};

    dataLabels.forEach((dataLabel) => {
      const input = this.userInputsModel.getInputStates(dataLabel) as InputState;
      inputValues[dataLabel] = input.value;
    });

    return inputValues;
  }

  protected getAuthData(): AuthUserData {
    const authStore = this.storeManager.getStore(Stores.AUTH_STORE) as AuthStore;
    return authStore.getAuthUserData();
  }

  protected async sendRequest(urlPathname: RequestPathnames, body: any): Promise<UserLocalStorageType> {
    const request: Request = this.createRequest(urlPathname, body);
    const response: Response = await this.requestSender.send(request).create();
    return response.parseResponse();
  }

  protected parseError(error: Error): void {
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

  private createRequest(urlPathname: RequestPathnames, body: any): Request {
    return this.requestCreator
      .appendUrlPathname(urlPathname)
      .setBody(body)
      .createRequest();
  }
}
