import { InputLabels } from "../../constants";
import { NetworkService } from "../../services/network.service";
import { ValidationError, ValidationService } from "../../services/validation.service";
import { dispatchAction } from "../store";
import { userStore } from "../store/user.store";

type SettingsType = {
  value: string;
  inputLabel: InputLabels;
};

export class SettingsModel {
  protected async startUpdating(updatedData: Array<SettingsType>) {
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

  protected preparingSendingData(updatedData: Array<SettingsType>) {
    const sendingData = {};

    updatedData.forEach(({value, inputLabel}) => {
      sendingData[inputLabel] = value;
    });

    return sendingData;
  }

  protected async sendRequest(sendingData: any) {
    const networkService = new NetworkService();
    return await networkService.update(sendingData);
  }

  protected dispatchStateAction(inputLabel: InputLabels, value: string) {
    dispatchAction(userStore.actions.updateData(inputLabel, value));
  }

  private parseError(error: Error) {
    if (error instanceof ValidationError) {
      return error;
    } else {
      console.log(error);
    }
  }
}
