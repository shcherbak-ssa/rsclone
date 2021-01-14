import { LanguageLabels, Themes } from "../../../common/constants";
import { Stores } from "../../constants";
import { StoreManagerService } from "../../services/store-manager.service";
import { AuthStore } from "../../types/auth.types";
import { StoreManager } from "../../types/store.types";
import { UserInputsStore } from "../../types/user-inputs.types";

export class AuthSettingsModel {
  private authStore: AuthStore;
  private userInputsStore: UserInputsStore;

  constructor() {
    const storeManager: StoreManager = new StoreManagerService();
    this.authStore = storeManager.getStore(Stores.AUTH_STORE) as AuthStore;
    this.userInputsStore = storeManager.getStore(Stores.USER_INPUTS_STORE) as UserInputsStore;
  }

  saveSettings(): LanguageLabels {
    const updatedLanguage: LanguageLabels = this.userInputsStore.getLanguage();
    const updatedTheme: Themes = this.userInputsStore.getTheme();

    this.authStore.updateLanguage(updatedLanguage);
    this.authStore.updateTheme(updatedTheme);

    return updatedLanguage;
  }
}
