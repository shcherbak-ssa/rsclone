import { Request, Response } from "../types/services.types";
import { Stores } from "../constants";
import { LanguageStore, RequestedLanguage, LanguageStoreState } from "../types/language.types";
import { StoreManager } from "../types/store.types";
import { StoreManagerService } from '../services/store-manager.service';
import { LanguageLabels, LanguageParts } from "../../common/constants";
import { BaseModel } from "./base.model";

export class LanguageModel extends BaseModel {
  private languageStore: LanguageStore;

  constructor() {
    super();

    const storeManager: StoreManager = new StoreManagerService();
    this.languageStore = storeManager.getStore(Stores.LANGUAGE_STORE) as LanguageStore;
  }

  async changeLanguage(nextLanguage: LanguageLabels) {
    try {
      const currentLanguageParts: LanguageParts[] = this.languageStore.getParts();
      const request: Request = this.createRequestLanguageParts({
        language: nextLanguage,
        languageParts: currentLanguageParts,
      });
  
      const response: Response = await this.requestSender.send(request).get();
      const changedLanguage: LanguageStoreState = response.parseResponse();
  
      this.languageStore.changeLanguage(changedLanguage);
    } catch (error) {
      console.log(error);
    }
  }

  async addLanguageParts(requestedLanguage: RequestedLanguage) {
    try {
      const request: Request = this.createRequestLanguageParts(requestedLanguage);
      const response: Response = await this.requestSender.send(request).get();
      const updatedLanguage: LanguageStoreState = response.parseResponse();

      this.languageStore.addParts(updatedLanguage);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequestLanguageParts({language, languageParts}: RequestedLanguage): Request {
    const languagePathname: string = this.urlPathname.getLanguagePathname(language);

    return this.requestCreator
      .appendUrlPathname(languagePathname)
      .appendUrlQuery({languageParts})
      .createRequest();
  }
}
