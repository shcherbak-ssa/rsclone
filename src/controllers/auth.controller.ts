import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { AuthSettingsModel } from '../models/auth/auth-settings.model';
import { LanguageLabels } from '../../common/constants';
import { ChangingLanguage, languageController } from './language.controller';
import { AuthEvents, LanguageEvents } from '../constants/events.constants';

export const authController: Controller = new EventEmitter();

authController.on(AuthEvents.SAVE_SETTINGS, saveChangesHandler);

async function saveChangesHandler(callback: Function) {
  const authSettingsModel: AuthSettingsModel = new AuthSettingsModel();
  const nextLanguage: LanguageLabels = authSettingsModel.saveSettings();

  const changeLanguageEventPayload: ChangingLanguage = {
    nextLanguage,
    callback,
  };

  languageController.emit(LanguageEvents.CHANGE_LANGUAGE, changeLanguageEventPayload);
}
