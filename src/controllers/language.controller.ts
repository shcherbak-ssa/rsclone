import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { LanguageEvents } from '../constants';
import { LanguageModel } from '../models/language.model';
import { RequestedLanguage } from '../types/language.types';

export const languageController: Controller = new EventEmitter();

export type UpdatingLanguageData = {
  requestedLanguage: RequestedLanguage;
  callback: Function;
};

languageController
  .on(LanguageEvents.CHANGE_LANGUAGE, changeLanguageHandler)
  .on(LanguageEvents.ADD_PARTS, addLanguagePartsHandler);

function changeLanguageHandler() {}

async function addLanguagePartsHandler({requestedLanguage, callback}: UpdatingLanguageData) {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.addLanguageParts(requestedLanguage);

  callback();
}
