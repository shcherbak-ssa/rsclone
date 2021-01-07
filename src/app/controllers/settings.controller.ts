import { SettingsEvents } from '../constants';
import { Events } from '../../services/events.service';

import { SettingsUserModel, SettingsUserType } from '../models/settings-user.model';
import { SettingsEmailType, SettingsLoginModel } from '../models/settings-login.model';
import { SettingsAppModel, UpdatedAppSettingsType } from '../models/settings-app.model';

export const settingsController: Events = new Events();

let settingsUserModel: SettingsUserModel | null = null;
let settingsLoginModel: SettingsLoginModel | null = null;
let settingsAppModel: SettingsAppModel | null = null;

settingsController
  .on(SettingsEvents.INIT_SETTINGS, initSettingsHandler)
  .on(SettingsEvents.REMOVE_SETTINGS, removeSettingsHandler);

function initSettingsHandler() {
  settingsUserModel = new SettingsUserModel();
  settingsLoginModel = new SettingsLoginModel();
  settingsAppModel = new SettingsAppModel();

  settingsController
    .on(SettingsEvents.UPDATE_USER, updateUserHandler)
    .on(SettingsEvents.UPDATE_EMAIL, updateEmailHandler)
    .on(SettingsEvents.UPDATE_APP, updateAppHandler);
}

function removeSettingsHandler() {
  settingsController
    .off(SettingsEvents.UPDATE_USER, updateUserHandler)
    .off(SettingsEvents.UPDATE_EMAIL, updateEmailHandler)
    .off(SettingsEvents.UPDATE_APP, updateAppHandler);

  settingsUserModel = null;
  settingsLoginModel = null;
  settingsAppModel = null;
}

async function updateUserHandler(updatedUser: SettingsUserType) {
  await settingsUserModel.updateUser(updatedUser);
}

async function updateEmailHandler(updatedEmail: SettingsEmailType) {
  await settingsLoginModel.updateEmail(updatedEmail);
}

async function updateAppHandler(updatedAppSettings: UpdatedAppSettingsType) {
  await settingsAppModel.updateSettings(updatedAppSettings);
}
