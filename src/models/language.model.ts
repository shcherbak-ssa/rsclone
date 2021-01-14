import { Request, RequestCreator, RequestSender, Response } from "../types/services.types";
import { RequestCreatorService } from "../services/request-creator.service";
import { RequestSenderService } from "../services/request-sender.service";
import { Stores } from "../constants";
import { LanguageStore, RequestedLanguage, LanguageStoreState } from "../types/language.types";
import { StoreManager } from "../types/store.types";
import { StoreManagerService } from '../services/store-manager.service';
import { LanguageLabels, LanguageParts } from "../../common/constants";
import { UrlPathnameService } from "../services/url-pathname.service";

export interface LanguageUrlPathname {
  getLanguagePathname(language: LanguageLabels): string;
}

export class LanguageModel {
  private requestCreator: RequestCreator;
  private requestSender: RequestSender;
  private languageStore: LanguageStore;

  constructor() {
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();

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
    const urlPathnameService: LanguageUrlPathname = new UrlPathnameService();
    const languagePathname: string = urlPathnameService.getLanguagePathname(language);

    return this.requestCreator
      .appendUrlPathname(languagePathname)
      .appendUrlQuery({languageParts})
      .createRequest();
  }
}
