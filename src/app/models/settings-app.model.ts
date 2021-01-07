import {
  InputLabels,
  ERROR_RESPONSE_TYPE,
  SUCCESS_RESPONSE_TYPE,
} from "../../constants";
import { NetworkResponse } from "../../services/network.service";
import { SettingsModel } from "./settings.model";

export type SettingsAppType = {
  language?: string;
  theme?: string;
  callback: Function;
};

export class SettingsAppModel extends SettingsModel {
  async updateApp({language, theme, callback}: SettingsAppType) {
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
      const response: NetworkResponse = await this.sendRequest(sendingData);

      if (response.type === SUCCESS_RESPONSE_TYPE) {
        const {language, theme} = response.payload;
  
        if (language) {
          this.dispatchActionState(InputLabels.LANGUAGE_INPUT_LABEL, language);
        }

        if (theme) {
          this.dispatchActionState(InputLabels.THEME_INPUT_LABEL, theme);
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
}
