import { RequestCreator, RequestSender } from "../types/services.types";
import { RequestCreatorService } from "../services/request-creator.service";
import { RequestSenderService } from "../services/request-sender.service";
import { StoreActions } from "../types/store.types";
import { storeService } from "../services/store.service";
import { Stores } from "../constants";
import { RequestData } from "../data/request.data";
import { ResponseData } from "../data/response.data";
import { UpdateLanguage } from "../types/language.types";

export class LanguageModel {
  private requestCreator: RequestCreator;
  private requestSender: RequestSender;
  private languageStoreActions: StoreActions;

  constructor() {
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();
    this.languageStoreActions = storeService.getStoreActions(Stores.LANGUAGE_STORE);
  }

  async changeLanguage() {}

  async addLanguageParts(updateLanguage: UpdateLanguage) {
    try {
      const requestData: RequestData = this.createRequestForAddingLaguageParts(updateLanguage);
      const responseData: ResponseData = await this.requestSender.send(requestData).get();
      const requestedLanguageParts: any = responseData.parseResponse();

      console.log(requestedLanguageParts);
      this.languageStoreActions.addPart(requestedLanguageParts);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequestForAddingLaguageParts(
    {language, languageParts}: UpdateLanguage
  ): RequestData {
    this.requestCreator.appendUrlPathname(`/languages/${language}`);
    this.requestCreator.appendUrlQuery({languageParts});
    return this.requestCreator.createRequest();
  }
}
