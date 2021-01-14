import { RequestCreator, RequestSender } from "../types/services.types";
import { RequestCreatorService } from "../services/request-creator.service";
import { RequestSenderService } from "../services/request-sender.service";
import { Stores } from "../constants";
import { RequestModel } from "./request.model";
import { ResponseModel } from "./response.model";
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
      const requestModel: RequestModel = this.createRequestLanguageParts({
        language: nextLanguage,
        languageParts: currentLanguageParts,
      });
  
      const responseModel: ResponseModel = await this.requestSender.send(requestModel).get();
      const changedLanguage: LanguageStoreState = responseModel.parseResponse();
  
      this.languageStore.changeLanguage(changedLanguage);
    } catch (error) {
      console.log(error);
    }
  }

  async addLanguageParts(requestedLanguage: RequestedLanguage) {
    try {
      const requestModel: RequestModel = this.createRequestLanguageParts(requestedLanguage);
      const responseModel: ResponseModel = await this.requestSender.send(requestModel).get();
      const updatedLanguage: LanguageStoreState = responseModel.parseResponse();

      this.languageStore.addParts(updatedLanguage);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequestLanguageParts({language, languageParts}: RequestedLanguage): RequestModel {
    const urlPathnameService: LanguageUrlPathname = new UrlPathnameService();
    const languagePathname: string = urlPathnameService.getLanguagePathname(language);

    return this.requestCreator
      .appendUrlPathname(languagePathname)
      .appendUrlQuery({languageParts})
      .createRequest();
  }
}
