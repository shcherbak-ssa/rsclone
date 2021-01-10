import { AppEvents } from "../constants";
import { AppModel } from "../models/app.model";
import { Controller } from "../types/controller.types";
import { EventEmitter } from "../services/event-emitter.service";

export const appController: Controller = new EventEmitter();

appController
  .once(AppEvents.INIT_APP, initAppHeadler)
  .once(AppEvents.INIT_AUTHORIZATION, initAuthorizationHeandler)
  .once(AppEvents.REMOVE_INIT_EVENTS, removeInitEventsHandler);

async function initAppHeadler(renderAppCallback: (initialRoutePathname: string) => void) {
  const appModel = new AppModel();
  await appModel.initApp(renderAppCallback);
}

async function initAuthorizationHeandler(renderAppCallback: (initialRoutePathname: string) => void) {
  const appModel = new AppModel();
  await appModel.initAuthorization(renderAppCallback);
}

function removeInitEventsHandler() {
  appController
    .off(AppEvents.INIT_APP, initAppHeadler)
    .off(AppEvents.INIT_AUTHORIZATION, initAuthorizationHeandler);
}
