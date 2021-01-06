import { SettingsEvents } from '../constants';
import { Events } from '../../services/events.service';
import { SettingsModel, UpdatedEmailType } from '../models/settings.model';

export const settingsController: Events = new Events();

let settingsModel: SettingsModel | null = null;

settingsController
  .on(SettingsEvents.INIT_SETTINGS, initSettingsHandler)
  .on(SettingsEvents.REMOVE_SETTINGS, removeSettingsHandler);

function initSettingsHandler() {
  settingsModel = new SettingsModel();

  settingsController
    .on(SettingsEvents.UPDATE_EMAIL, updateEmailHandler);
}

async function updateEmailHandler(updatedEmail: UpdatedEmailType) {
  await settingsModel.updateEmail(updatedEmail);
}

function removeSettingsHandler() {
  settingsModel = null;

  settingsController
    .off(SettingsEvents.UPDATE_EMAIL, updateEmailHandler);
}
