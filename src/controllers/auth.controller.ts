import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { AuthSettingsModel } from '../models/auth/auth-settings.model';
import { LanguageLabels } from '../../common/constants';
import { ChangingLanguage, languageController } from './language.controller';
import { AuthEvents, LanguageEvents } from '../constants/events.constants';
import { RegistrationModel } from '../models/auth/registration.model';

export const authController: Controller = new EventEmitter();

authController
  .on(AuthEvents.SAVE_SETTINGS, saveChangesHandler)
  .on(AuthEvents.INIT_REGISTRATION, initRegistraionHandler)
  .on(AuthEvents.INIT_LOGIN, initLoginHanlder);

async function saveChangesHandler(callback: Function) {
  const authSettingsModel: AuthSettingsModel = new AuthSettingsModel();
  const nextLanguage: LanguageLabels = authSettingsModel.saveSettings();

  const changeLanguageEventPayload: ChangingLanguage = {
    nextLanguage,
    callback,
  };

  languageController.emit(LanguageEvents.CHANGE_LANGUAGE, changeLanguageEventPayload);
}

async function initRegistraionHandler() {
  const registrationModel: RegistrationModel = new RegistrationModel();
  await registrationModel.createUser();
}

async function initLoginHanlder() {}
