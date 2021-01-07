import {
  InputLabels,
  ERROR_RESPONSE_TYPE,
  SUCCESS_RESPONSE_TYPE,
  USER_LOCALSTORAGE_LABEL,
} from "../../constants";
import { LocalStorageService } from "../../services/localstorage.service";
import { NetworkResponse } from "../../services/network.service";
import { ValidationError } from "../../services/validation.service";
import { SettingsModel } from "./settings.model";

export type UpdatedUserSettingsType = {
  newName?: string;
  newUsername?: string;
  successCallback: Function;
  errorCallback: Function;
};

export class SettingsUserModel extends SettingsModel {
  async updateSettings(updatedUserSettings: UpdatedUserSettingsType) {
    const updatedSettings = this.preparingUpdatedSettings(updatedUserSettings);
    const response: NetworkResponse | ValidationError = await this.startUpdating(updatedSettings);

    if (response instanceof ValidationError) {
      updatedUserSettings.errorCallback(response);
    } else {
      this.parseResponse(response, updatedUserSettings);
    }
  }

  private preparingUpdatedSettings({newName, newUsername}: UpdatedUserSettingsType) {
    const updatedSettings = [];

    if (newName !== undefined) {
      updatedSettings.push({
        value: newName, inputLabel: InputLabels.NAME_INPUT_LABEL,
      });
    }

    if (newUsername !== undefined) {
      updatedSettings.push({
        value: newUsername, inputLabel: InputLabels.USERNAME_INPUT_LABEL,
      });
    }

    return updatedSettings;
  }

  private parseResponse(response: NetworkResponse, updatedUserSettings: UpdatedUserSettingsType) {
    const {successCallback, errorCallback} = updatedUserSettings;

    if (response.type === SUCCESS_RESPONSE_TYPE) {
      this.updateUserStates(response);
      successCallback();
    } else if (response.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = response;
      errorCallback(new ValidationError(message, payload));
    }
  }

  private updateUserStates(response: NetworkResponse) {
    const {name, username} = response.payload;

    if (name) {
      this.dispatchStateAction(InputLabels.NAME_INPUT_LABEL, name);
    }

    if (username) {
      const localStorageService = new LocalStorageService();
      const {userID} = localStorageService.get(USER_LOCALSTORAGE_LABEL);

      localStorageService.save(USER_LOCALSTORAGE_LABEL, {userID, username});
      location.replace(location.origin);
    }
  }
}
