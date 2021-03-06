import { AppEvents, LanguageEvents } from "../constants/events.constants";
import { Controller, Emoji, Spaces } from "../types/services.types";
import { AppModel } from "../models/app.model";
import { languageController } from './language.controller';
import { EventEmitter } from "../services/event-emitter.service";
import { LanguageLabels, LanguageParts } from "../../common/constants";
import { RequestedLanguage } from "../types/language.types";
import { defaultLanguageParts } from "../data/languages.data";
import { StoreManager } from "../types/store.types";
import { StoreManagerService } from "../services/store-manager.service";
import { UserStore } from "../types/user.types";
import { Stores, UserDataLabels } from "../constants";
import { EmojiService } from "../services/emoji.service";
import { SpacesService } from "../services/spaces.service";

export const appController: Controller = new EventEmitter();

appController
  .once(AppEvents.INIT_APP, initAppHeadler)
  .once(AppEvents.INIT_AUTHORIZATION, initAuthorizationHeandler)
  .once(AppEvents.REMOVE_INIT_EVENTS, removeInitEventsHandler);

async function initAppHeadler(renderAppCallback: (initialRoutePathname: string) => void) {
  const appModel: AppModel = new AppModel();
  const initialRoutePathname: string | null = await appModel.initApp();

  if (initialRoutePathname === null) {
    appController.emit(AppEvents.INIT_AUTHORIZATION, renderAppCallback);
  } else {
    const storeManager: StoreManager = new StoreManagerService();
    await storeManager.addStore(Stores.ACTIVE_SPACE_STORE);

    const userStore = storeManager.getStore(Stores.USER_STORE) as UserStore;

    const requestedLanguage: RequestedLanguage = {
      language: userStore.getStates()[UserDataLabels.LANGUAGE],
      languageParts: [LanguageParts.APP, ...defaultLanguageParts],
    };

    languageController.emit(
      LanguageEvents.ADD_PARTS,
      { 
        requestedLanguage,
        callback: () => {
          renderAppCallback(initialRoutePathname);
        },
      },
    );

    const emojiService: Emoji = new EmojiService();
    await emojiService.loadSpacesEmojis();

    const spacesService: Spaces = new SpacesService();
    spacesService.setInitialRandomSpaceLogo();
  }
}

async function initAuthorizationHeandler(renderAppCallback: (initialRoutePathname: string) => void) {
  const appModel: AppModel = new AppModel();
  const initialRoutePathname: string = await appModel.initAuthorization();

  const requestedLanguage: RequestedLanguage = {
    language: LanguageLabels.ENGLISH,
    languageParts: [LanguageParts.AUTH, ...defaultLanguageParts],
  };

  languageController.emit(
    LanguageEvents.ADD_PARTS,
    {
      requestedLanguage,
      callback: () => {
        renderAppCallback(initialRoutePathname);
      },
    }
  );
}

async function removeInitEventsHandler() {
  appController
    .off(AppEvents.INIT_APP, initAppHeadler)
    .off(AppEvents.INIT_AUTHORIZATION, initAuthorizationHeandler);
}
