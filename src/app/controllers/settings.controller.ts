import { SettingsEvents } from '../constants';
import { Events } from '../../services/events.service';
import { SettingsModel, UpdatedEmailType, UpdatedUserType } from '../models/settings.model';

export const settingsController: Events = new Events();

let settingsModel: SettingsModel | null = null;

settingsController
  .on(SettingsEvents.INIT_SETTINGS, initSettingsHandler)
  .on(SettingsEvents.REMOVE_SETTINGS, removeSettingsHandler);

function initSettingsHandler() {
  settingsModel = new SettingsModel();

  settingsController
    .on(SettingsEvents.UPDATE_EMAIL, updateEmailHandler)
    .on(SettingsEvents.UPDATE_USER, updateUserHandler);
}

async function updateEmailHandler(updatedEmail: UpdatedEmailType) {
  await settingsModel.updateEmail(updatedEmail);
}

async function updateUserHandler(updatedUser: UpdatedUserType) {
  await settingsModel.updateUser(updatedUser);
}

function removeSettingsHandler() {
  settingsModel = null;

  settingsController
    .off(SettingsEvents.UPDATE_EMAIL, updateEmailHandler)
    .off(SettingsEvents.UPDATE_USER, updateUserHandler);
}
