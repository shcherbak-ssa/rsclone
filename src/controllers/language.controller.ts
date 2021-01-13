import { LanguageEvents } from '../constants/events.constants';
import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { LanguageModel } from '../models/language.model';
import { RequestedLanguage } from '../types/language.types';
import { LanguageLabels } from '../../common/constants';

export const languageController: Controller = new EventEmitter();

export type UpdatingLanguageData = {
  requestedLanguage: RequestedLanguage;
  callback: Function;
};

languageController
  .on(LanguageEvents.CHANGE_LANGUAGE, changeLanguageHandler)
  .on(LanguageEvents.ADD_PARTS, addLanguagePartsHandler);

async function changeLanguageHandler(nextLanguage: LanguageLabels): Promise<void> {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.changeLanguage(nextLanguage);
}

async function addLanguagePartsHandler(
  {requestedLanguage, callback}: UpdatingLanguageData
): Promise<void> {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.addLanguageParts(requestedLanguage);

  callback();
}
