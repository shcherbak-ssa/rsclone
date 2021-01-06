import { ERROR_RESPONSE_TYPE, InputLabels, SUCCESS_RESPONSE_TYPE, USER_LOCALSTORAGE_LABEL } from "../../constants";
import { LocalStorageService } from "../../services/localstorage.service";
import { NetworkResponse, NetworkService } from "../../services/network.service";
import { ValidationError, ValidationService } from "../../services/validation.service";
import { dispatchAction } from "../store";
import { userStore } from "../store/user.store";

const {updateData} = userStore.actions;

type SettingsType = {
  value: string;
  inputLabel: InputLabels;
};

export type UpdatedEmailType = {
  newEmail: string;
  callback: Function;
};

export type UpdatedUserType = {
  newName?: string;
  newUsername?: string;
  callback: Function;
};

export type UpdatedAppType = {
  language?: string;
  theme?: string;
  callback: Function;
};

export class SettingsModel {
  async updateUser({newName, newUsername, callback}: UpdatedUserType) {
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

    const result: NetworkResponse = await this.startUpdating(updatedData);

    if (result.type === SUCCESS_RESPONSE_TYPE) {
      const {name, username} = result.payload;

      if (name) {
        dispatchAction(updateData(InputLabels.NAME_INPUT_LABEL, name));
      }

      if (username) {
        const localStorageService = new LocalStorageService();
        const {userID} = localStorageService.get(USER_LOCALSTORAGE_LABEL);

        localStorageService.save(USER_LOCALSTORAGE_LABEL, {userID, username});
        location.replace(location.origin);
      }
    } else if (result.type === ERROR_RESPONSE_TYPE) {
      const {message, payload} = result;
      return callback(new ValidationError(message, payload));
    }

    callback(result);
  }

  async updateEmail({newEmail, callback}: UpdatedEmailType) {
    const updatedData = [{
      value: newEmail, inputLabel: InputLabels.EMAIL_INPUT_LABEL,
    }];
    const result: NetworkResponse = await this.startUpdating(updatedData);

    if (result.type === SUCCESS_RESPONSE_TYPE) {
      const {email} = result.payload;
      dispatchAction(updateData(InputLabels.EMAIL_INPUT_LABEL, email));
    }

    callback(result);
  }

  async updateApp({language, theme, callback}: UpdatedAppType) {
    const updatedData = [];

    if (language !== undefined) {
      updatedData.push({
        value: language, inputLabel: InputLabels.LANGUAGE_INPUT_LABEL,
      });
    }

    if (theme !== undefined) {
      updatedData.push({
        value: theme, inputLabel: InputLabels.THEME_INPUT_LABEL,
      });
    }

    try {
      const sendingData = this.preparingSendingData(updatedData);
      const response = await this.sendRequest(sendingData);

      if (response.type === SUCCESS_RESPONSE_TYPE) {
        const {language, theme} = response.payload;
  
        if (language) {
          dispatchAction(updateData(InputLabels.LANGUAGE_INPUT_LABEL, language));
        }

        if (theme) {
          dispatchAction(updateData(InputLabels.THEME_INPUT_LABEL, theme));
        }
      } else if (response.type === ERROR_RESPONSE_TYPE) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      callback();
    }
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
