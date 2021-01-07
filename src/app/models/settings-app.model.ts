import { InputLabels, ERROR_RESPONSE_TYPE, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse } from "../../services/network.service";
import { SettingsModel } from "./settings.model";

export type UpdatedAppSettingsType = {
  language?: string;
  theme?: string;
  callback: Function;
};

export class SettingsAppModel extends SettingsModel {
  async updateSettings(updatedAppSettings: UpdatedAppSettingsType) {
    try {
      const updatedSettings = this.preparingUpdatedSettings(updatedAppSettings);
      const sendingData = this.preparingSendingData(updatedSettings);
      const response: NetworkResponse = await this.sendRequest(sendingData);
      this.parseResponse(response);
    } catch (error) {
      console.log(error);
    } finally {
      updatedAppSettings.callback();
    }
  }

  private preparingUpdatedSettings({language, theme}: UpdatedAppSettingsType) {
    const updatedSettings = [];

    if (language !== undefined) {
      updatedSettings.push({
        value: language, inputLabel: InputLabels.LANGUAGE_INPUT_LABEL,
      });
    }

    if (theme !== undefined) {
      updatedSettings.push({
        value: theme, inputLabel: InputLabels.THEME_INPUT_LABEL,
      });
    }

    return updatedSettings;
  }

  private parseResponse(response: NetworkResponse) {
    if (response.type === SUCCESS_RESPONSE_TYPE) {
      this.updateUserStates(response);
    } else if (response.type === ERROR_RESPONSE_TYPE) {
      console.log(response);
    }
  }

  private updateUserStates(response: NetworkResponse) {
    const {language, theme} = response.payload;
  
    if (language) {
      this.dispatchStateAction(InputLabels.LANGUAGE_INPUT_LABEL, language);
    }

    if (theme) {
      this.dispatchStateAction(InputLabels.THEME_INPUT_LABEL, theme);
    }
  }
}
