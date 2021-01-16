import { Stores } from "../constants";
import { StoreCreator } from "./store-manager.service";

export class StoreLoaderService {
  async loadStore(storeName: Stores): Promise<StoreCreator> {
    switch (storeName) {
      case Stores.LANGUAGE_STORE:
        return await this.loadLanguageStore();
      case Stores.USER_DRAFT_STORE:
        return await this.loadUserDraftStore();
      case Stores.AUTH_STORE:
        return await this.loadAuthStore();
      case Stores.USER_STORE:
        return await this.loadUserStore();
    }
  }

  private async loadLanguageStore(): Promise<StoreCreator> {
    const {languageStoreCreator} = await import('../store/language.store');
    return languageStoreCreator;
  }

  private async loadUserDraftStore(): Promise<StoreCreator> {
    const {userDraftStoreCreator} = await import('../store/user-draft.store');
    return userDraftStoreCreator;
  }

  private async loadAuthStore(): Promise<StoreCreator> {
    const {authStoreCreator} = await import('../store/auth.store');
    return authStoreCreator;
  }

  private async loadUserStore(): Promise<StoreCreator> {
    const {userStoreCreator} = await import('../store/user.store');
    return userStoreCreator;
  }
}
