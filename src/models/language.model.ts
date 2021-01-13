import { RequestCreator, RequestSender } from "../types/services.types";
import { RequestCreatorService } from "../services/request-creator.service";
import { RequestSenderService } from "../services/request-sender.service";
import { Stores } from "../constants";
import { RequestData } from "../data/request.data";
import { ResponseData } from "../data/response.data";
import { LanguageStore, RequestedLanguage, LanguageStoreState } from "../types/language.types";
import { StoreManager } from "../types/store.types";
import { StoreManagerService } from '../services/store-manager.service';

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

  async changeLanguage() {}

  async addLanguageParts(requestedLanguage: RequestedLanguage) {
    try {
      const requestData: RequestData = this.createRequestForAddingLanguageParts(requestedLanguage);
      const responseData: ResponseData = await this.requestSender.send(requestData).get();
      const updatedLanguage: LanguageStoreState = responseData.parseResponse();

      this.languageStore.addParts(updatedLanguage);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequestForAddingLanguageParts(
    {language, languageParts}: RequestedLanguage
  ): RequestData {
    this.requestCreator.appendUrlPathname(`/languages/${language}`);
    this.requestCreator.appendUrlQuery({languageParts});
    return this.requestCreator.createRequest();
  }
}
