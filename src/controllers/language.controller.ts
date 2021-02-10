import { LanguageEvents } from '../constants/events.constants';
import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { LanguageModel } from '../models/language.model';
import { RequestedLanguage } from '../types/language.types';
import { LanguageLabels } from '../../common/constants';

export const languageController: Controller = new EventEmitter();

export type ChangingLanguage = {
  nextLanguage: LanguageLabels,
  callback: Function,
}

export type UpdatingLanguage = {
  requestedLanguage: RequestedLanguage;
  callback: Function;
};

languageController
  .on(LanguageEvents.CHANGE_LANGUAGE, changeLanguageHandler)
  .on(LanguageEvents.ADD_PARTS, addLanguagePartsHandler);

async function changeLanguageHandler(
  {nextLanguage, callback}: ChangingLanguage
): Promise<void> {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.changeLanguage(nextLanguage);

  callback();
}

async function addLanguagePartsHandler(
  {requestedLanguage, callback}: UpdatingLanguage
): Promise<void> {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.addLanguageParts(requestedLanguage);

  callback();
}
