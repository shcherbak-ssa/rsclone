import { SettingsEvents } from '../constants';
import { Events } from '../../services/events.service';

import {
  SettingsAppModel,
  UpdatedAppSettingsType,
} from '../models/settings-app.model';
import {
  UpdatedUserAvatarType,
  SettingsUserModel,
  UpdatedUserSettingsType,
} from '../models/settings-user.model';
import {
  UpdatedLoginSettingsType,
  SettingsLoginModel,
  ConfirmPasswordType,
} from '../models/settings-login.model';
import {
  SettingsShortcutsModel,
  SettingsShortcutsType,
} from '../models/settings-shortcuts.model';

export const settingsController: Events = new Events();

let settingsUserModel: SettingsUserModel | null = null;
let settingsLoginModel: SettingsLoginModel | null = null;
let settingsAppModel: SettingsAppModel | null = null;
let settingsShortcutsModel: SettingsShortcutsModel | null = null;

settingsController
  .on(SettingsEvents.INIT_SETTINGS, initSettingsHandler)
  .on(SettingsEvents.REMOVE_SETTINGS, removeSettingsHandler);

function initSettingsHandler() {
  settingsUserModel = new SettingsUserModel();
  settingsLoginModel = new SettingsLoginModel();
  settingsAppModel = new SettingsAppModel();
  settingsShortcutsModel = new SettingsShortcutsModel();

  settingsController
    .on(SettingsEvents.UPDATE_USER, updateUserHandler)
    .on(SettingsEvents.UPDATE_USER_AVATAR, updateUserAvatarHandler)
    .on(SettingsEvents.UPDATE_LOGIN, updateLoginHandler)
    .on(SettingsEvents.CONFIRM_PASSWORD, confirmPasswordHandler)
    .on(SettingsEvents.UPDATE_APP, updateAppHandler)
    .on(SettingsEvents.UPDATE_SHORTCUTS, updateShortcuts);
}

function removeSettingsHandler() {
  settingsController
    .off(SettingsEvents.UPDATE_USER, updateUserHandler)
    .off(SettingsEvents.UPDATE_USER_AVATAR, updateUserAvatarHandler)
    .off(SettingsEvents.UPDATE_LOGIN, updateLoginHandler)
    .off(SettingsEvents.CONFIRM_PASSWORD, confirmPasswordHandler)
    .off(SettingsEvents.UPDATE_APP, updateAppHandler)
    .off(SettingsEvents.UPDATE_SHORTCUTS, updateShortcuts);

  settingsUserModel = null;
  settingsLoginModel = null;
  settingsAppModel = null;
  settingsShortcutsModel = null;
}

async function updateUserHandler(updatedUserSettings: UpdatedUserSettingsType) {
  await settingsUserModel.updateSettings(updatedUserSettings);
}

async function updateUserAvatarHandler(updatedUserAvatar: UpdatedUserAvatarType) {
  await settingsUserModel.updateUserAvatar(updatedUserAvatar);
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

async function updateShortcuts(updatedShorcuts: SettingsShortcutsType) {
  await settingsShortcutsModel.updateSettings(updatedShorcuts);
}
