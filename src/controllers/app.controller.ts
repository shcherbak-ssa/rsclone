import { AppEvents, LanguageEvents } from "../constants";
import { Controller } from "../types/services.types";
import { AppModel } from "../models/app.model";
import { languageController } from './language.controller';
import { EventEmitter } from "../services/event-emitter.service";
import { LanguageParts } from "../../common/constants";

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
    languageController.emit(
      LanguageEvents.ADD_PARTS,
      { 
        language: 'en',
        languageParts: [LanguageParts.USER_INPUTS],
        callback: () => {
          renderAppCallback(initialRoutePathname);
        },
      },
    );
  }
}

async function initAuthorizationHeandler(renderAppCallback: (initialRoutePathname: string) => void) {
  const appModel: AppModel = new AppModel();
  const initialRoutePathname: string = await appModel.initAuthorization();

  languageController.emit(
    LanguageEvents.ADD_PARTS,
    {
      language: 'en',
      languageParts: [LanguageParts.USER_INPUTS, LanguageParts.AUTH],
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
