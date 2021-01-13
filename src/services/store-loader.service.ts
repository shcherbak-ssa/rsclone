import { Stores } from "../constants";
import { StoreCreator } from "./store-manager.service";

export class StoreLoaderService {
  async loadStore(storeName: Stores): Promise<StoreCreator> {
    switch (storeName) {
      case Stores.LANGUAGE_STORE:
        return await this.loadLanguageStore();
      case Stores.USER_INPUTS_STORE:
        return await this.loadUserInputsStore();
      // case Stores.AUTH_STORE:
      //   return await import('../store/auth.store');
    }
  }

  private async loadLanguageStore(): Promise<StoreCreator> {
    const {languageStoreCreator} = await import('../store/language.store');
    return languageStoreCreator;
  }

  private async loadUserInputsStore(): Promise<StoreCreator> {
    const {userInputsStoreCreator} = await import('../store/user-inputs.store');
    return userInputsStoreCreator;
  }
}