import { InputLabels, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse, NetworkService } from "../../services/network.service";
import { ValidationError } from "../../services/validation.service";
import { SettingsModel } from './settings.model';

export type UpdatedLoginSettingsType = {
  newEmail?: string;
  newPassword?: string;
  successCallback: Function;
  errorCallback: Function;
};

export type ConfirmPasswordType = {
  password: string;
  successCallback: Function;
  errorCallback: Function;
};

export class SettingsLoginModel extends SettingsModel {
  async updateSettings(updatedLoginSettings: UpdatedLoginSettingsType) {
    const updatedData = this.preparingUpdatedSettings(updatedLoginSettings);
    const response: NetworkResponse | ValidationError = await this.startUpdating(updatedData);
    
    if (response instanceof ValidationError) {
      updatedLoginSettings.errorCallback(response);
    } else {
      this.parseResponse(response, updatedLoginSettings);
    }
  }

  async confirmPassword({password, successCallback, errorCallback}: ConfirmPasswordType) {
    try {
      const confirmPasswordData = this.preparingConfirmPasswordData(password);
      this.validate(confirmPasswordData);

      const response: NetworkResponse = await this.sendConfirmPasswordRequest(password);

      if (response.type === SUCCESS_RESPONSE_TYPE) {
        successCallback();
      } else {
        errorCallback(response.message);
      }
    } catch (error) {
      const resultError = this.parseError(error);

      if (resultError) {
        errorCallback(resultError.message);
      }
    }
  }

  private preparingUpdatedSettings({newEmail, newPassword}: UpdatedLoginSettingsType) {
    const updatedSettings = [];

    if (newEmail !== undefined) {
      updatedSettings.push({
        value: newEmail, inputLabel: InputLabels.EMAIL_INPUT_LABEL,
      });
    }

    if (newPassword !== undefined) {
      updatedSettings.push({
        value: newPassword, inputLabel: InputLabels.PASSWORD_INPUT_LABEL,
      });
    }

    return updatedSettings;
  }

  private parseResponse(response: NetworkResponse, updatedLoginSettings: UpdatedLoginSettingsType) {
    const {successCallback, errorCallback} = updatedLoginSettings;

    if (response.type === SUCCESS_RESPONSE_TYPE) {
      const {email} = response.payload;

      if (email) {
        this.dispatchStateAction(InputLabels.EMAIL_INPUT_LABEL, email);
      }

      successCallback();
    } else {
      const {message, payload} = response;
      errorCallback(new ValidationError(message, payload));
    }
  }

  private preparingConfirmPasswordData(password: string) {
    return [{
      value: password, inputLabel: InputLabels.PASSWORD_INPUT_LABEL,
    }];
  }

  private async sendConfirmPasswordRequest(password: string) {
    const networkService = new NetworkService();
    return await networkService.create({password});
  }
}
