import { AppEvents } from "../constants";
import { Controller } from "../types/controller.types";
import { AppModel } from "../models/app.model";
import { EventEmitter } from "../services/event-emitter.service";

export const appController: Controller = new EventEmitter();

appController.once(AppEvents.INIT_APP, initAppHeadler);

async function initAppHeadler() {
  const appModel = new AppModel();
  await appModel.initApp();
}
