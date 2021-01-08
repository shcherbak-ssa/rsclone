import { KeyboardShortcutType } from "../../../core/types";
import { InputLabels } from "../../constants";
import { NetworkService } from "../../services/network.service";
import { SettingsModel } from "./settings.model";

export type SettingsShortcutsType = {
  keyboardShortcuts: Array<KeyboardShortcutType>;
  successCallback: Function;
};

export class SettingsShortcutsModel extends SettingsModel {
  async updateSettings({keyboardShortcuts, successCallback}: SettingsShortcutsType) {
    const networkService = new NetworkService();
    const response = await networkService.update({keyboardShortcuts});
    const {payload} = response;

    this.dispatchStateAction(InputLabels.KEYBOARD_SHORTCUTS_LABEL, payload.keyboardShortcuts);
    successCallback();
  }
}
