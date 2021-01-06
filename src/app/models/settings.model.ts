import { InputLabels, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse, NetworkService } from "../../services/network.service";
import { ValidationError, ValidationService } from "../../services/validation.service";
import { dispatchAction } from "../store";
import { userStore } from "../store/user.store";

const {updateEmail} = userStore.actions;

type SettingsType = {
  value: string;
  inputLabel: InputLabels;
};

export type UpdatedEmailType = {
  newEmail: string;
  callback: Function;
};

export class SettingsModel {
  async updateEmail({newEmail, callback}: UpdatedEmailType) {
    const updatedData = [{
      value: newEmail, inputLabel: InputLabels.EMAIL_INPUT_LABEL,
    }];
    const result: NetworkResponse = await this.startUpdating(updatedData);

    if (result.type === SUCCESS_RESPONSE_TYPE) {
      const {email} = result.payload;
      dispatchAction(updateEmail(email));
    }

    callback(result);
  }

  private async startUpdating(updatedData: Array<SettingsType>) {
    try {
      this.validate(updatedData);

      const sendingData = this.preparingSendingData(updatedData);
      return await this.sendRequest(sendingData);
    } catch (error) {
      return this.parseError(error);
    }
  }

  private validate(updatedData: Array<SettingsType>) {
    const validationService = new ValidationService();

    updatedData.forEach(({value, inputLabel}) => {
      validationService.validate(value, inputLabel);
    });
  }

  private preparingSendingData(updatedData: Array<SettingsType>) {
    const sendingData = {};

    updatedData.forEach(({value, inputLabel}) => {
      sendingData[inputLabel] = value;
    });

    return sendingData;
  }

  private async sendRequest(sendingData: any) {
    const networkService = new NetworkService();
    return await networkService.update(sendingData);
  }

  private parseError(error: Error) {
    if (error instanceof ValidationError) {
      return error;
    } else {
      console.log(error);
    }
  }
}
