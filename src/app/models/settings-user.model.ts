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

export type SettingsUserType = {
  newName?: string;
  newUsername?: string;
  callback: Function;
};

export class SettingsUserModel extends SettingsModel {
  async updateUser({newName, newUsername, callback}: SettingsUserType) {
    const updatedData = [];

    if (newName !== undefined) {
      updatedData.push({
        value: newName, inputLabel: InputLabels.NAME_INPUT_LABEL,
      });
    }

    if (newUsername !== undefined) {
      updatedData.push({
        value: newUsername, inputLabel: InputLabels.USERNAME_INPUT_LABEL,
      });
    }

    const response: NetworkResponse = await this.startUpdating(updatedData);

    if (response.type === SUCCESS_RESPONSE_TYPE) {
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
    } else if (response.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = response;
      return callback(new ValidationError(message, payload));
    }

    callback(response);
  }
}
