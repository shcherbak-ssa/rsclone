import { SettingsEvents } from '../constants';
import { Events } from '../../services/events.service';

import { SettingsUserModel, UpdatedUserSettingsType } from '../models/settings-user.model';
import {
  UpdatedLoginSettingsType,
  SettingsLoginModel,
  ConfirmPasswordType,
} from '../models/settings-login.model';
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
    .on(SettingsEvents.UPDATE_LOGIN, updateLoginHandler)
    .on(SettingsEvents.CONFIRM_PASSWORD, confirmPasswordHandler)
    .on(SettingsEvents.UPDATE_APP, updateAppHandler);
}

function removeSettingsHandler() {
  settingsController
    .off(SettingsEvents.UPDATE_USER, updateUserHandler)
    .off(SettingsEvents.UPDATE_LOGIN, updateLoginHandler)
    .off(SettingsEvents.CONFIRM_PASSWORD, confirmPasswordHandler)
    .off(SettingsEvents.UPDATE_APP, updateAppHandler);

  settingsUserModel = null;
  settingsLoginModel = null;
  settingsAppModel = null;
}

async function updateUserHandler(updatedUserSettings: UpdatedUserSettingsType) {
  await settingsUserModel.updateSettings(updatedUserSettings);
}

async function updateLoginHandler(updatedLoginSettings: UpdatedLoginSettingsType) {
  await settingsLoginModel.updateSettings(updatedLoginSettings);
}

async function confirmPasswordHandler(confirmPassword: ConfirmPasswordType) {
  await settingsLoginModel.confirmPassword(confirmPassword);
}

async function updateAppHandler(updatedAppSettings: UpdatedAppSettingsType) {
  await settingsAppModel.updateSettings(updatedAppSettings);
}
