import { LanguageLabels, LanguageParts } from '../../common/constants';
import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { LanguageEvents } from '../constants';
import { LanguageModel } from '../models/language.model';
import { UpdateLanguage } from '../types/language.types';

export const languageController: Controller = new EventEmitter();

languageController
  .on(LanguageEvents.CHANGE_LANGUAGE, changeLanguageHandler)
  .on(LanguageEvents.ADD_PARTS, addLanguagePartsHandler);

function changeLanguageHandler() {}

async function addLanguagePartsHandler(updateLanguage: UpdateLanguage) {
  const languageModel: LanguageModel = new LanguageModel();
  await languageModel.addLanguageParts(updateLanguage);

  updateLanguage.callback();
}
