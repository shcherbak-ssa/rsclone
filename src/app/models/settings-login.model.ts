import { InputLabels, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse } from "../../services/network.service";
import { SettingsModel } from './settings.model';

export type UpdatedEmailType = {
  newEmail: string;
  successCallback: Function;
  errorCallback: Function;
};

export class SettingsLoginModel extends SettingsModel {
  async updateEmail({newEmail, successCallback, errorCallback}: UpdatedEmailType) {
    const updatedData = this.preapringEmailUpdatedData(newEmail);
    const response: NetworkResponse = await this.startUpdating(updatedData);

    if (response.type === SUCCESS_RESPONSE_TYPE) {
      const {email} = response.payload;
      this.dispatchStateAction(InputLabels.EMAIL_INPUT_LABEL, email);

      successCallback();
    } else {
      errorCallback(response.message);
    }
  }

  private preapringEmailUpdatedData(newEmail: string) {
    return [{
      value: newEmail, inputLabel: InputLabels.EMAIL_INPUT_LABEL,
    }];
  }
}
