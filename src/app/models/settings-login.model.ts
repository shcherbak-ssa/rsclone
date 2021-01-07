import {
  InputLabels,
  ERROR_RESPONSE_TYPE,
  SUCCESS_RESPONSE_TYPE,
} from "../../constants";
import { NetworkResponse } from "../../services/network.service";
import { SettingsModel } from './settings.model';

export type SettingsEmailType = {
  newEmail: string;
  callback: Function;
};

export class SettingsLoginModel extends SettingsModel {
  async updateEmail({newEmail, callback}: SettingsEmailType) {
    const updatedData = [{
      value: newEmail, inputLabel: InputLabels.EMAIL_INPUT_LABEL,
    }];
    const result: NetworkResponse = await this.startUpdating(updatedData);

    if (result.type === SUCCESS_RESPONSE_TYPE) {
      const {email} = result.payload;
      this.dispatchStateAction(InputLabels.EMAIL_INPUT_LABEL, email);
    }

    callback(result);
  }
}
